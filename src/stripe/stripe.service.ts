import { Injectable } from '@nestjs/common';
import { userService } from 'src/user/user.service';


import Stripe from 'stripe';

@Injectable()
export class StripeService {
 private stripe: Stripe;
    constructor( private userService: userService) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2022-11-15",
        })
    }
    
    async createCheckoutSession(origin:string, email:string) {
        try {
            const session = await this.stripe.checkout.sessions.create({
                mode: "payment",
                line_items: [
                    {
                        price: process.env.PRICE_KEY,
                        quantity: 1,
                    },
                ],
                customer_email: email,
                success_url: `${origin}?success=true` , //,
                cancel_url: `${origin}?canceled=true`,
            });
            return session;
        }catch (error) {
            console.log("faild to create checkout session");
            console.log(error);
        }
    }

    async createCustomer(email:string, name:string) { 

        try {
            const costomer = await this.stripe.customers.create({
                email: email,
                name: name,
            });
            console.log(costomer)
            return costomer;
        }catch (error) {
            console.log("faild to create customer");
            console.log(error);
        }
    }

    async createSubscription(name:string,email:string, paymentMethod:string) {

        try {
                // Attach the payment method to the customer
            const customer = await this.stripe.customers.create({
                email,
                name,
                payment_method: paymentMethod,
                invoice_settings: { default_payment_method: paymentMethod },
            });

            const subscription = await this.stripe.subscriptions.create({
                customer: customer.id,
                items: [{ price: process.env.SUB_PRICE_KEY }],
                payment_settings: {
                    payment_method_types: ["card"],
                    save_default_payment_method: "on_subscription",
                  },
                expand: ["latest_invoice.payment_intent"],
            });
            // console.log(subscription)
            return subscription;
        }catch (error) {
            console.log("faild to create subscription");
            console.log(error);
        }

    }

    async cancelSubscription(subscriptionId:string) {
        try {
            const subscription = await this.stripe.subscriptions.del(subscriptionId);
            return subscription;
        }catch (error) {
            console.log("faild to cancel subscription");
            console.log(error);
        }
    }
}
            // // Set the payment method as the customer's default payment method
            // await this.stripe.customers.update(customerId, {
            //     invoice_settings: {
            //         default_payment_method: paymentMethod.id,
            //     },
            // });