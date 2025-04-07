<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function authenticate(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if($validator->fails()){

            return response()->json([
                'status' => 400,
                'errors' => $validator->errors() 
            ],400);
        }

        if(Auth::attempt(['email' => $request-> email,'password' => $request->password])) {
            
            $user = User::find(Auth::user()->id);
            
            if($user->role == 'admin'){
                
                $token = $user->createToken('token')->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'token' => $token,
                    'id' => $user->id,
                    'name' =>$user->name,
                ],200);

            } else{
                return response()->json([
                    'status' => 401,
                    'message' => 'You are not authorised to access admin panel.'
                ],401);
            }

        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Either email/password is incorrect.'
            ],401);
        }
    }

    // public function show(){

    //     $user = Auth::all();

    //     return response()->json([
    //         'status' => 200,
    //         'data' => $user
    //     ]);
    // }

    public function changePassword(Request $request)
    {
        $user = User::find(Auth::id());

        // Ensure user is authenticated and is an admin
        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Validate input
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if old password is correct
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'status' => 400,
                'message' => 'Old password is incorrect'
            ], 400);
        }

        // Save new password
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'Password updated successfully'
        ], 200);
    }
    
}
