<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Shipping;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function saveOrder(Request $request)
    {
        if (!empty($request->cart))
        {
             //Save order in db
            $order = new Order();
            $order->name = $request->name;
            $order->email = $request->email;
            $order->address = $request->address;
            $order->city = $request->city;
            $order->state = $request->state;
            $order->zip = $request->zip;
            $order->mobile = $request->mobile;
            $order->subtotal = $request->subtotal;
            $order->shipping = $request->shipping;
            $order->grand_total = $request->grand_total;
            $order->discount = $request->discount;
            $order->payment_status = $request->payment_status;
            $order->status = $request->status;
            $order->user_id = $request->user()->id;
            $order->save();


            //Save order items
            foreach ($request->cart as $item)
            {
                $orderItem = new OrderItem();
                $orderItem->order_id = $order->id;
                $orderItem->price = $item['qty'] * $item['price'];
                $orderItem->unit_price = $item['price'];
                $orderItem->qty = $item['qty'];
                $orderItem->product_id = $item['product_id'];
                $orderItem->size = $item['size'];
                $orderItem->name = $item['title'];
                $orderItem->save();
            }

            return response()->json([
                'status' => 201,
                'id' =>  $order->id,    
                'message' => "Order is Successfully placed",
            ],201);
        }
        
        else{
            return response()->json([
                'status' => 400,
                'message' => "Your Cart is Empty",
            ],400);
        }
    }

    public function show()
    {
        $details = Order::orderBy('created_at','DESC')
                        ->get();

        return response()->json([
            'status' => 200,
            'data' => $details
        ]);
    }

    public function confirm($id)
    {
        $details = Order::where('id', $id)
                ->with('items')
                ->first();

        if (!$details) {
            return response()->json([
                'status' => 404,
                'message' => "Order not found"
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $details
        ]);
    }

    public function view($order_id)
    {
        // Fetch order details
        $order = Order::where('id', $order_id)->first();

        if (!$order) {
            return response()->json([
                'status' => 404,
                'message' => "Order not found"
            ], 404);
        }

        // Fetch order items for the given order_id
        $orderItems = OrderItem::where('order_id', $order_id)->get();
                                
        if ($orderItems->isEmpty()) {
            return response()->json([
                'status' => 404,
                'message' => "No order items found for this order"
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'order' => $order, 
            'items' => $orderItems
        ]);
    }

    //Testing Api for the order items individual
    public function detail($order_id)
    {
        // Fetch order items for the given order_id
        $orderItems = Order::with('items','items.product')->find($order_id);
                                
        if ($orderItems == null) {
            return response()->json([
                'status' => 404,
                'message' => "No order items found for this order"
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $orderItems
        ]);
    }

    public function shipping()
    {
        $details = OrderItem::all();

        return response()->json([
            'status' => 200,
            'data' => $details
        ]);
    }

    //This method is to display order for an particular user
    public function order_details($user_id)
    {
        // Fetch orders belonging to the user
        $orders = Order::where('user_id', $user_id)->get();

        if ($orders->isEmpty()) {
            return response()->json([
                'status' => 404,
                'message' => "No orders found for this user"
            ], 404);
        }

        // Fetch order items based on the user's order IDs
        $orderIds = $orders->pluck('id');
        $orderItems = OrderItem::whereIn('order_id', $orderIds)->get();

        if ($orderItems->isEmpty()) {
            return response()->json([
                'status' => 404,
                'message' => "No order items found for this user"
            ], 404);
        }

        // Combine orders and their items for a detailed response
        $responseData = $orders->map(function ($order) use ($orderItems) {
            return [
                'order_id' => $order->id,
                'name' => $order->name,
                'email' => $order->email,
                'address' => $order->address,
                'city' => $order->city,
                'state' => $order->state,
                'zip' => $order->zip,
                'mobile' => $order->mobile,
                'subtotal' => $order->subtotal,
                'shipping' => $order->shipping,
                'grand_total' => $order->grand_total,
                'discount' => $order->discount,
                'payment_status' => $order->payment_status,
                'status' => $order->status,
                'created_at' => $order->created_at,
                'items' => $orderItems->where('order_id', $order->id)->values()
            ];
        });

        return response()->json([
            'status' => 200,
            'data' => $responseData
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        try {
            $order = Order::find($id);

            if (!$order) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Order not found',
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'status' => 'required|in:pending,shipped,delivered,cancelled',
                'paymentStatus' => 'required|in:paid,not paid',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $order->status = $request->input('status');
            $order->payment_status = $request->input('paymentStatus');
            $order->save();

            return response()->json([
                'status' => 200,
                'message' => 'Order status updated successfully',
                'data' => $order,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'An error occurred while updating the order',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
    