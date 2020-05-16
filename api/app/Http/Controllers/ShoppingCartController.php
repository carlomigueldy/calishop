<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ShoppingCartController extends Controller
{
    protected $cart;
    
    public function __construct()
    {
        $this->cart = auth()->user()->cart;
    }
    
    /**
     * Add a new product to the shopping cart.
     *
     * @param Integer $productId
     * @return \Illuminate\Http\Response
     */
    public function add($productId, $quantity = 0)
    {
        $product = Product::find($productId);
        
        $this->cart->items()->create([
            'product_id' => $product->id,
            'price' => $product->price ?? 0,
            'quantity' => $quantity,
        ]);

        $this->cart->calculateTotalAmount();

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

        // add the item into the user's shopping cart
        $this->cart->items()->whereId($cartItemId)
            ->first()->update([
                'product_id' => $product->id,
                'quantity' => $request->quantity,
                'price' => $product->price,
            ]);

        $this->cart->calculateTotalAmount();

        return response()->json([
            'message' => 'The cart item has been updated.'
        ], 204);
    }

    /**
     * Remove the specified cart item ID.
     *
     * @param  Integer  $productId
     * @return \Illuminate\Http\Response
     */
    public function destroy($productId)
    {
        $deleted = $this->cart->items()
            ->whereProductId($productId)
            ->first()
            ->delete();

        $this->cart->calculateTotalAmount();
        
        return response()->json($deleted, 204);
    }
}
