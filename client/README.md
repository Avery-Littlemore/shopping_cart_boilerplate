Avery's README.md

Send POST requests to http://localhost:5001/api/products with bodies similar to:
{
  "title": "Amazon Kindle E-reader",
  "quantity": 5,
  "price": 79.99,
}

I did it on Postman. Or you can add from the app itself.

The buy is really janky. It is really just updating the item quantities on the backend, whereas adding them to the cart only updates the quantities on the front end

I'm aware that this is only changing the quantity for me, not for all viewers... 
I can edit the quantity on the backend, but then when I refresh the page it won't replenish the items that were in my cart
Still working on how to achieve that.
Another issue that I've discovered with this is if I add to cart and then edit the quantity, my math does some weird stuff

Also working on how to "buy" items, and what to return.