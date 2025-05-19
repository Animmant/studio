'use client';

import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SectionTitle from '@/components/shared/SectionTitle';
import AnimatedButton from '@/components/shared/AnimatedButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from '@/context/AppStateContext';
import { Loader2, ShoppingCart, Trash2, MinusCircle, PlusCircle } from 'lucide-react';
import type { Product, CartItem } from '@/types';
import Image from 'next/image';

const orderSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  paymentMethod: z.string().min(1, { message: 'Please select a payment method.' }),
});

type OrderFormData = z.infer<typeof orderSchema>;

const OrderFormSection = () => {
  const { toast } = useToast();
  const { cart, scrollToFormItem, setScrollToFormItem, addToCart, removeFromCart, updateQuantity, clearCart } = useAppState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      paymentMethod: '',
    },
  });

  useEffect(() => {
    // This effect ensures that if scrollToFormItem changes *after* initial mount (e.g. from another component)
    // the form will still scroll into view.
    if (scrollToFormItem) {
       const orderFormSection = document.getElementById('order-form-section');
        if (orderFormSection) {
          orderFormSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Optional: Clear it after scrolling if you only want it to trigger once per set
        // setScrollToFormItem(null); 
    }
  }, [scrollToFormItem, setScrollToFormItem]);


  const onSubmit: SubmitHandler<OrderFormData> = async (data) => {
    if (cart.length === 0) {
      toast({
        title: 'Empty Cart',
        description: 'Please add items to your cart before placing an order.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Order Submitted:', data, cart);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);

    toast({
      title: 'Order Placed!',
      description: `Thank you, ${data.name}! Your order for ${cart.reduce((sum, item) => sum + item.quantity, 0)} item(s) has been received.`,
      variant: 'default',
    });
    form.reset();
    clearCart();
    setScrollToFormItem(null); // Clear selected item after order
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <section id="order-form-section" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Complete Your Order" subtitle="Fill in your details to get your PS5 gear." />
        <Card className="max-w-4xl mx-auto shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl">Your Cart</CardTitle>
            {cart.length === 0 && <CardDescription>Your cart is currently empty. Add some products to get started!</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-6">
            {cart.length > 0 && (
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between p-3 bg-background/50 rounded-md">
                    <div className="flex items-center space-x-3">
                       <Image src={item.product.imageUrl} alt={item.product.name} width={60} height={60} className="rounded-md object-cover" data-ai-hint={item.product.dataAiHint || 'product image'}/>
                      <div>
                        <p className="font-semibold text-primary-foreground">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                       <AnimatedButton size="icon" variant="ghost" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="h-7 w-7">
                        <MinusCircle className="h-4 w-4" />
                      </AnimatedButton>
                      <span>{item.quantity}</span>
                      <AnimatedButton size="icon" variant="ghost" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="h-7 w-7">
                        <PlusCircle className="h-4 w-4" />
                      </AnimatedButton>
                      <AnimatedButton size="icon" variant="ghost" onClick={() => removeFromCart(item.product.id)} className="h-7 w-7 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </AnimatedButton>
                    </div>
                  </div>
                ))}
                <div className="text-right font-bold text-xl text-primary-foreground pt-4 border-t border-border">
                  Total: ${totalAmount.toFixed(2)}
                </div>
              </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-lg">Full Name</Label>
                <Input id="name" {...form.register('name')} placeholder="John Doe" className="mt-1" />
                {form.formState.errors.name && <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-lg">Email Address</Label>
                <Input id="email" type="email" {...form.register('email')} placeholder="you@example.com" className="mt-1" />
                {form.formState.errors.email && <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="address" className="text-lg">Shipping Address</Label>
                <Input id="address" {...form.register('address')} placeholder="123 Gaming Lane, Tech City" className="mt-1" />
                {form.formState.errors.address && <p className="text-sm text-destructive mt-1">{form.formState.errors.address.message}</p>}
              </div>
              
              <Controller
                name="paymentMethod"
                control={form.control}
                render={({ field }) => (
                  <div>
                    <Label htmlFor="paymentMethod" className="text-lg">Payment Method</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger id="paymentMethod" className="mt-1">
                        <SelectValue placeholder="Select a payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="crypto">Cryptocurrency (Conceptual)</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.paymentMethod && <p className="text-sm text-destructive mt-1">{form.formState.errors.paymentMethod.message}</p>}
                  </div>
                )}
              />
              
              <AnimatedButton type="submit" variant="accent" size="lg" className="w-full" disabled={isSubmitting || cart.length === 0}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <ShoppingCart className="mr-2 h-5 w-5" />
                )}
                {isSubmitting ? 'Processing Order...' : `Place Order ($${totalAmount.toFixed(2)})`}
              </AnimatedButton>
            </form>
            <p className="text-xs text-center text-muted-foreground mt-4">
              This is a demo order form. No real payment will be processed.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OrderFormSection;
