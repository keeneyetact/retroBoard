import { useEffect, useMemo, useState, useCallback } from 'react';
import { Actions, Post, Vote, VoteType } from 'retro-board-common';
import { v4 } from 'uuid';
import { find } from 'lodash';
import { trackAction, trackEvent } from './../../track';
import io from 'socket.io-client';
import useGlobalState from '../../state';
import useUser from '../../auth/useUser';

const debug = process.env.NODE_ENV === 'development';

function sendFactory(socket: SocketIOClient.Socket, sessionId: string) {
  return function(action: string, payload?: any) {
    if (socket) {
      socket.emit(action, {
        sessionId: sessionId,
        payload,
      });
    }
  };
}

const useGame = (sessionId: string) => {
  const [initialised, setInitialised] = useState(false);
  const [disconnected, setDisconnected] = useState(false);
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const {
    state,
    receivePost,
    receiveBoard,
    setPlayers,
    deletePost,
    updatePost,
    receiveVote,
    renameSession,
    resetSession,
  } = useGlobalState();

  const { session } = state;
  const user = useUser();
  const userId = user?.id;
  const [prevUserId, setPrevUserId] = useState(userId);
  const allowMultipleVotes = session
    ? session.options.allowMultipleVotes
    : false;

  // Send function, built with current socket, user and sessionId
  const send = useMemo(() => (socket ? sendFactory(socket, sessionId) : null), [
    socket,
    sessionId,
  ]);

  const reconnect = useCallback(() => setDisconnected(false), []);

  // This will run on unmount
  useEffect(() => {
    return () => {
      if (debug) {
        console.log('Reset session');
      }
      trackEvent('game/session/reset');
      resetSession();
    };
  }, [resetSession]);

  // Handles re-connection if the user changes (login/logout)
  useEffect(() => {
    if (userId !== prevUserId) {
      if (debug) {
        console.log('User changed, set disconnected to false');
      }
      setDisconnected(false);
      setPrevUserId(userId);
    }
  }, [userId, prevUserId]);

  // This effect will run everytime the gameId, the user, or the socket changes.
  // It will close and restart the socket every time.
  useEffect(() => {
    if (disconnected) {
      return;
    }
    if (debug) {
      console.log('Initialising Game socket');
    }
    const newSocket = io();
    resetSession();
    setSocket(newSocket);

    const send = sendFactory(newSocket, sessionId);

    // Socket events listeners
    newSocket.on('disconnect', () => {
      if (debug) {
        console.warn('Server disconnected');
      }
      trackEvent('game/session/disconnect');
      setDisconnected(true);
    });

    newSocket.on('connect', () => {
      if (debug) {
        console.log('Connected to the socket');
      }
      setInitialised(true);
      send(Actions.JOIN_SESSION);
      trackAction(Actions.JOIN_SESSION);
    });

    newSocket.on(Actions.RECEIVE_POST, (post: Post) => {
      if (debug) {
        console.log('Receive new post: ', post);
      }
      receivePost(post);
    });

    newSocket.on(Actions.RECEIVE_BOARD, (posts: Post[]) => {
      if (debug) {
        console.log('Receive entire board: ', posts);
      }
      receiveBoard(posts);
    });

    newSocket.on(Actions.RECEIVE_CLIENT_LIST, (clients: string[]) => {
      if (debug) {
        console.log('Receive players list: ', clients);
      }
      setPlayers(clients);
    });

    newSocket.on(Actions.RECEIVE_DELETE_POST, (post: Post) => {
      if (debug) {
        console.log('Delete post: ', post);
      }
      deletePost(post);
    });

    newSocket.on(
      Actions.RECEIVE_LIKE,
      ({ postId, vote }: { postId: string; vote: Vote }) => {
        if (debug) {
          console.log('Receive vote: ', postId, vote);
        }
        receiveVote(postId, vote);
      }
    );

    newSocket.on(Actions.RECEIVE_EDIT_POST, (post: { post: Post }) => {
      if (debug) {
        console.log('Receive edit post: ', post.post);
      }
      updatePost(post.post);
    });

    newSocket.on(Actions.RECEIVE_SESSION_NAME, (name: string) => {
      if (debug) {
        console.log('Receive session name: ', name);
      }
      renameSession(name);
    });
    return () => {
      if (debug) {
        console.log('Attempting disconnection');
      }
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [
    userId,
    sessionId,
    resetSession,
    receivePost,
    receiveVote,
    receiveBoard,
    setPlayers,
    deletePost,
    updatePost,
    renameSession,
    disconnected,
  ]);

  // Callbacks
  const onAddPost = useCallback(
    (columnIndex: number, content: string) => {
      if (send) {
        const post: Post = {
          content,
          action: null,
          giphy: null,
          votes: [],
          id: v4(),
          column: columnIndex,
          user: user!,
        };

        receivePost(post);
        send(Actions.ADD_POST_SUCCESS, post);
        trackAction(Actions.ADD_POST_SUCCESS);
      }
    },
    [receivePost, send, user]
  );

  const onEditPost = useCallback(
    (post: Post) => {
      if (send) {
        updatePost(post);
        send(Actions.EDIT_POST, { post });
        trackAction(Actions.EDIT_POST);
      }
    },
    [updatePost, send]
  );

  const onDeletePost = useCallback(
    (post: Post) => {
      if (send) {
        deletePost(post);
        send(Actions.DELETE_POST, post);
        trackAction(Actions.DELETE_POST);
      }
    },
    [deletePost, send]
  );

  const onLike = useCallback(
    (post: Post, like: boolean) => {
      if (send) {
        const type: VoteType = like ? 'like' : 'dislike';
        const existingVote = find(
          post.votes,
          v => v.type === type && v.user.id === user!.id
        );
        if (existingVote && !allowMultipleVotes) {
          return;
        }
        const vote: Vote = {
          id: v4(),
          type,
          user: user!,
        };
        const modifiedPost: Post = {
          ...post,
          votes: [...post.votes, vote],
        };
        updatePost(modifiedPost);
        send(Actions.LIKE_SUCCESS, {
          type,
          post,
        });
        trackAction(Actions.LIKE_SUCCESS);
      }
    },
    [user, send, updatePost, allowMultipleVotes]
  );

  const onRenameSession = useCallback(
    (name: string) => {
      if (send) {
        renameSession(name);
        send(Actions.RENAME_SESSION, { name });
        trackAction(Actions.RENAME_SESSION);
      }
    },
    [send, renameSession]
  );

  return {
    initialised,
    disconnected,
    onAddPost,
    onEditPost,
    onDeletePost,
    onLike,
    onRenameSession,
    reconnect,
  };
};

export default useGame;
