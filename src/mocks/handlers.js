import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                  "name": "Mint chip",
                  "imagePath": "images/mint-chip.png" 
                },
                {
                  "name": "Vanilla",
                  "imagePath": "images/vanilla.png" 
                },
                {
                  "name": "Chocolate",
                  "imagePath": "images/chocolate.png" 
                },
                {
                  "name": "Salted caramel",
                  "imagePath": "images/salted-caramel.png" 
                }
            ])
        );
    }),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
              {
                "name": "Hot fudge",
                "imagePath": "images/hot-fudge.png"
              },
              {
                "name": "Peanut butter cups",
                "imagePath": "images/peanut-butter-cups.png"
              },
              {
                "name": "Gummi bears",
                "imagePath": "images/gummi-bears.png"
              },
              {
                "name": "Mochi",
                "imagePath": "images/mochi.png"
              },
              {
                "name": "Cherries",
                "imagePath": "images/cherries.png"
              }
            ])
        );
    }),
    rest.post('http://localhost:3030/order', (req, res, ctx) => {
        const orderNumber = Math.floor(Math.random() * 1000000);
        return res(
            ctx.status(201),
            ctx.json({ orderNumber })
        );
    }),
];
