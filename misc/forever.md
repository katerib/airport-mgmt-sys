Install forever code:

`npm i forever --save`

Run the following command from the root of the project:

`alias forever='./node_modules/forever/bin/forever'`

Now forever will work by running `forever` from the root of any project that has the forever dependency installed

Start with:

`forever app.js`