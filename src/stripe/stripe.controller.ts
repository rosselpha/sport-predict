import { Controller, Body, Post,Headers } from '@nestjs/common';

import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
    constructor(private stripeService:StripeService) {}

    @Post('create-checkout-session')
    async createCheckoutSession(@Headers('origin') origin:string, @Body('email') email:string) {
        return await this.stripeService.createCheckoutSession(origin, email);  
    }

    @Post('create-customer')
    async createCustomer(@Body('email') email:string, @Body('name') name:string) {
        return await this.stripeService.createCustomer(email, name);
    }
    
    @Post('create-subscription')
    async createSubscription(@Body('name') name:string, @Body('email') email:string, @Body('paymentMethod') paymentMethod:string) {
        return await this.stripeService.createSubscription(name, email, paymentMethod);
    }

    @Post('cancel-subscription')
    async cancelSubscription(@Body('subscriptionId') subscriptionId:string) {
        return await this.stripeService.cancelSubscription(subscriptionId);
    }

}
