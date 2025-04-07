<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index() {
        $cartData = Cart::where('user_id', Auth::id())->with('product')->get();
        $subtotal = $cartData->sum(fn($item) => $item->qty * $item->price);
        $shipping = 0;
        $grandTotal = $subtotal + $shipping;
    
        return response()->json([
            'cartData' => $cartData,
            'subTotal' => $subtotal,
            'shipping' => $shipping,
            'grandTotal' => $grandTotal
        ]);
    }
    
    public function addToCart(Request $request) {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'size' => 'nullable|string',
            'qty' => 'required|integer|min:1',
        ]);
    
        $product = Product::find($request->product_id);
        $cartItem = Cart::where('user_id', Auth::id())
                        ->where('product_id', $request->product_id)
                        ->where('size', $request->size)
                        ->first();
    
        if ($cartItem) {
            $cartItem->qty += $request->qty;
            $cartItem->save();
        } else {
            Cart::create([
                'user_id' => Auth::id(),
                'product_id' => $request->product_id,
                'size' => $request->size,
                'qty' => $request->qty,
                'price' => $product->price
            ]);
        }
    
        return response()->json(['message' => 'Product added to cart']);
    }
    
    public function updateCartItem(Request $request, $id) {
        $cartItem = Cart::where('id', $id)->where('user_id', Auth::id())->first();
    
        if ($cartItem) {
            $cartItem->qty = $request->qty;
            $cartItem->save();
            return response()->json(['message' => 'Cart item updated']);
        }
    
        return response()->json(['message' => 'Item not found'], 404);
    }
    
    public function deleteCartItem($id) {
        $cartItem = Cart::where('id', $id)->where('user_id', Auth::id())->first();
        if ($cartItem) {
            $cartItem->delete();
            return response()->json(['message' => 'Item removed from cart']);
        }
    
        return response()->json(['message' => 'Item not found'], 404);
    }
}

