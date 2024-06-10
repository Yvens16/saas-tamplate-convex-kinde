# KindeAuth setup

[SetUp Url](https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/)

````javascript
<button
    onClick={() =>
      login({
        authUrlParams: {
            connection_id: process.env.NEXT_PUBLIC_CONNECTION_ID
            login_hint: "dave@kinde.com"
         }
      })
    }
>
    Sign in with email
</button>```
````
