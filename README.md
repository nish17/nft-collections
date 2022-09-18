In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Known problems
- Couldn't figure in the given time that on logging in, it is making 3 same requests at once, seems like a React custom hook issue, based on the state change when the component re-renders, I think it is also refetching it again.

## QnA
- Handle User Authentication
    - Would you need a database?

        Yes, database will be needed for storing user's credentials and validating those as and when required.

    - Which one and what might the schema look like?

        SQL or NoSQL, doesn't really matter much, as long as the input fields are well sanitized and validated before sending it to the DB.
        Another point I would like to add is that, SQL definitely has some advantages over NoSQL when there are related entities in our product.

        SCHEMA:

            id: uuidv4 (PK)

            email: string

            password_hash: string
        

        - password hash will be generated with the help of hashing function with salt.
    
    - Are there pros/cons to a specific choice? (SQL vs NoSQL)

        | SQL                                    | NoSQL                                    |
        |----------------------------------------|------------------------------------------|
        | Good when dealing with structured data | Good when dealing with unstructured data |
        | define schema beforehand               | schemaless                               |
        | can scale vertically                   | can easily scale horizontally            |
        | Follows ACID properties                | sticks to CAP theorem (2 properties)     |

        Specific to our case (User Authentication), 
        - we already know the structure of the data coming in (SQL✅)
        - ACID compliance (SQL✅)

    -  Serves data to the client via an API
        - What kind of API would you use?
            - I would choose GraphQL over REST here, because it fast, efficient and self documenting
            - It is also organized in terms of schema and type system.


    - Scales to handle thousands of requests per second
        - This could involve a lot of different optimizations, but what would you try first or what are the top three you might consider?
            - make systems distributed, use microservice architecture 
            - make their replicas
            - add load balancer to evenly distribute the load across replicas
            - DB can become a bottleneck at some point (given we chose SQL, more optimizations will be required here)

