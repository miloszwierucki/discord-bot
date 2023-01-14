
# Discord Sidebar Price Bots

<img align="right" alt="Git" width="25%" src="https://i.imgur.com/FcaV7s2.png"/>

App to display cryptocurrency data *(price, percentage change in 24 hours, and symbol)* as a Discord bot in users' sidebar. The current online status displays the **RSI indicator**:
- **0 < RSI <> 25** - online *(green dot)*
- **25 <RSI < 75** - idle *(yellow moon)*
- **75 < RSI < 100** - dnd *(red icon)*

## Setup

1. Run `npm install` to install all the node dependencies
2. Create **.env**, add "CLIENT ID" and "CLIENT SECRET" of created discord bot
2. Fill in **data.json** *(is in the **src** folder)*
    
## Running Tests

To run tests, run the following command (ts-node)

```bash
  npm start
```


## License

[MIT](https://choosealicense.com/licenses/mit/)

