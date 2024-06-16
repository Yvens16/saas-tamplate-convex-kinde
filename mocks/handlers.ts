import { http, HttpResponse, } from 'msw'

export const mutationUrl = `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/mutation`;
export const queryUrl = `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/query`;


type MutationRequestBody = {
  path: string,
  format: string,
  args: { [key: string]: any }[]
}

export const handlers = [
  http.post<any, MutationRequestBody>(queryUrl, async ({ params, request }) => {
    const reqBody = await request.json();
    const path = reqBody.path;
    console.log('path:', path)
    switch (path) {
      case "users:hasAccount":
        return HttpResponse.json({
          value: true,
          status: "success"
        }, { status: 200 })
      default:
        return HttpResponse.json({
          status: "error",
          errorData: {},
          errorMessage: "Ressource not found"
        }, { status: 400 });
    }
  }),
  http.post<any, MutationRequestBody>(mutationUrl, async ({ request }) => {
    const reqBody = await request.json();
    const path = reqBody.path;
    switch (path) {
      case "users:create":
        return HttpResponse.json({
          value: {
            email: 'test@gmail.com',
            lastName: 'Belaston',
            firstName: 'Yvens',
            linkedin: 'https://www.linkedin.com/in/marc-zukerberg/',
            city: 'Paris',
            company: 'GRDF',
          },
          status: "success"
        }, { status: 200 })
      default:
        return HttpResponse.json({
          status: "error",
          errorData: {},
          errorMessage: "Ressource not found"
        }, { status: 400 });
    }
  })
]


// const server = setupServer(
//   rest.post('<https://your-convex-backend-url/api/mutation',> (req, res, ctx) => {
//     // Check if the request is for the api.users.create mutation
//     if (req.body.path === 'users:create') {
//       // Return a mock response
//       return res(
//         ctx.json({
//           data: {
//             // Mock user data
//             id: '1',
//             name: 'John Doe',
//             email: 'john.doe@example.com',
//           },
//         })
//       );
//     }
//   })
// );

// export const handlers = [
//   http.get("http://localhost:3030/scoops", async () => {
//     return HttpResponse.json([
//       { name: "Chocolate", imagePath: "/images/chocolate.png" },
//       { name: "Vanilla", imagePath: "/images/vanilla.png" },
//     ]);
//   }),

//   http.get("http://localhost:3030/toppings", () => {
//     return HttpResponse.json([
//       { name: "Cherries", imagePath: "/images/cherries.png" },
//       { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
//       { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
//     ]);
//   }),

//   http.post("http://localhost:3030/order", async () => {
//     // add a 100ms pause here to give jest a chance to see the "loading" state.
//     // See https://www.udemy.com/course/react-testing-library/learn/lecture/36703860
//     //   for more details.
//     await delay(100);
//     return HttpResponse.json({ orderNumber: 123455676 }, { status: 201 });
//   }),
// ];