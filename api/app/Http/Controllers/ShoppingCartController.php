<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ShoppingCartController extends Controller
{
    /**
     * Add a new product to the shopping cart.
     *
     * @param Integer $productId
     * @return \Illuminate\Http\Response
     */
    public function add($productId, $quantity = 0)
    {
        $product = Product::find($productId);
        
        auth()->user()->cart->items()->create([
            'product_id' => $product->id,
            'price' => $product->price ?? 0,
            'quantity' => $quantity,
        ]);

        return response()->json([
            'message' => 'Added to cart.'
        ], 201);
    }

    /**
     * Update the specified cart item.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Integer  $cartItemId
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $cartItemId)
    {
        $product = Product::find($request->product_id);

        if ( !isset($product) ) {
            abort(403, "Cannot find the product.");
        }
        
        auth()->user()->cart->items()
            ->whereId($cartItemId)->first()->update([
                'product_id' => $product->id,
                'quantity' => $request->quantity,
                'price' => $product->price,
            ]);

        return response()->json([
            'message' => 'The cart item has been updated.'
        ]);
    }

    /**
     * Remove the specified cart item ID.
     *
     * @param  Integer  $cartItemId
     * @return \Illuminate\Http\Response
     */
    public function destroy($cartItemId)
    {
        return response()->json(
            auth()->user()->cart->items()->find($cartItemId)->delete()
        );
    }
}
