---
sidebar_position: 5
---

# 🤖 AI

To enable AI capabilities (enabling the Agile Coach for instance), you first need to get yourself an Open AI API key. You can get one [here](https://platform.openai.com/account/api-keys).

This is a paid service, but you can get a free trial. You can find more information about pricing [here](https://openai.com/pricing).

## How to configure

Once you have your API key, you need to add it to your `docker-compose.yml` file, under the backend section.

You have 3 keys:

```yaml
OPEN_AI_API_KEY: sk-XXXX # To activate AI capabilities, you need to get an API key from https://platform.openai.com/account/api-keys
OPEN_AI_FREE_LIMIT: 5 # Number of AI calls per rolling month, per user, for non-Pro accounts
OPEN_AI_PAID_LIMIT: 1000 # Number of AI calls per rolling month, per user, for Pro accounts
```

