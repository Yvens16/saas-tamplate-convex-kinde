# KindeAuth setup

[SetUp Url](https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/)

```js
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
</button>
```

## Testing
[Testing Hook](https://testing-library.com/docs/react-testing-library/api/#renderhook)

[React Testing library custom matchers](https://github.com/testing-library/jest-dom)

[Next Router Mock](https://www.npmjs.com/package/next-router-mock#jest-configuration)


## Icons
[Maybe Will user this library later](https://github.com/hugeicons/hugeicons-react)



## Nextjs

### Params props on the Page server component 
```javascript
// interface IPage {
//   searchParams: {
//     [key: string]: string | string[] | undefined,
//   },
//   params?: { slug: string };
// }

// { searchParams }: IPage
```

### Revalidate path for static rendering page
```javascript
// export const revalidate = 3600 // Here it revalidates every hour
// Revalidate choosen path on demand
// import { revalidatePath } from "next/cache"
// revalidatePath("/path")
``

```

### Uploading Images

[Convex package to upload images](https://uploadstuff.dev/api-reference/UploadButton)


## Paddle for subscripbtion 

[PaddleJs SDK](https://github.com/PaddleHQ/paddle-js-wrapper?tab=readme-ov-file)
[paddle Node JS SDK for webhook](https://github.com/PaddleHQ/paddle-node-sdk)



# Testing 


[Mocking guide](https://vitest.dev/guide/mocking#functions)

### Mock in all test

```javascript
vi.mock("next/navigation", async (importOriginal) => {
  return {
    ...await importOriginal<typeof import("next/navigation")>(),
    useSearchParams: () => new URLSearchParams({ "checkout": "true" })
  }
})
```

### Example of mocking per test

```javascript
    let nextNavigation = await import("next/navigation");
    nextNavigation.useSearchParams = vi.fn().mockReturnValue(new URLSearchParams({ "checkout": "true" }))
    // in other test
    nextNavigation.useSearchParams = vi.fn().mockReturnValue(new URLSearchParams({ }))
```

## Testing custom Hooks

[Testing Custom Hooks](https://react-hooks-testing-library.com/usage/basic-hooks)