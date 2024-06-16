
import { NextRequest } from 'next/server'
import { Paddle, EventName, ErrorCode } from '@paddle/paddle-node-sdk'

const paddle = new Paddle(process.env.PADDLE_API_KEY!);

export async function POST(req: NextRequest) {
  const sandboxIpAddress = ["34.194.127.46",
    "54.234.237.108",
    "3.208.120.145",
    "44.226.236.210",
    " 44.241.183.62",
    "100.20.172.113"];

  const liveIpAddress = ["34.232.58.13",
    "34.195.105.136",
    "34.237.3.244",
    "35.155.119.135",
    "52.11.166.252",
    "34.212.5.7"]

  const allowList = process.env.NODE_ENV === "development" ? sandboxIpAddress : liveIpAddress;
  const ip = req.ip || req.headers.get('X-Forwarded-For');

  if (!allowList.includes(ip as string)) {
    return new Response(`Forbidden`, {
      status: 403,
    })
  }

  const signature = (req.headers.get('paddle-signature') as string) || '';
  const rawRequestBody = req.body!.toString();
  const secretKey = process.env['WEBHOOK_SECRET_KEY'] || '';

  try {
    if (signature && rawRequestBody) {
      const eventData = paddle.webhooks.unmarshal(rawRequestBody, secretKey, signature);
      switch (eventData?.eventType) {
        case EventName.SubscriptionCreated:
          // Create Subscription object in db
          // User is premium === true
          // eventData.data.status === active
          console.log(`Product ${eventData.data.id} was updated`);
          break;
        case EventName.SubscriptionTrialing:
          // update subscription
          // User is premium === true
          // Status trialing for 7 days
          // eventData.data.status === trialing
          break;
        case EventName.SubscriptionActivated:
          // Update SubscriptionObject
          // User is premium === true
          // eventData.data.status === active
          console.log(`Subscription ${eventData.data.id} was updated`);
          break;
        case EventName.SubscriptionPaused:
          // Update SubscriptionObject
          // User is premium === false
          // eventData.data.status === paused
          console.log(`Subscription ${eventData.data.id} was updated`);
          break;
        case EventName.SubscriptionCanceled:
          // Update SubscriptionObject
          // User is premium === false
          // eventData.data.status === canceled
          console.log(`Subscription ${eventData.data.id} was updated`);
          break;
        case EventName.SubscriptionPastDue:
          // Update SubscriptionObject
          // User is premium === false
          // eventData.data.status === past_due
          // Afficher une banner pour lui de régler
          console.log(`Subscription ${eventData.data.id} was updated`);
          break;
        case EventName.SubscriptionResumed:
          // Update SubscriptionObject
          // User is premium === true
          // eventData.data.status === active
          console.log(`Subscription ${eventData.data.id} was updated`);
          break;
        default:
          console.log(eventData?.eventType);
      }
    } else {
      throw new Error("Signature missing in header");
    }
  } catch (err: any) {
    return new Response(`Webhook error: ${err.message}`, {
      status: 400,
    })
  }
  return new Response("Webhook call success", {
    status: 200,
  })
}