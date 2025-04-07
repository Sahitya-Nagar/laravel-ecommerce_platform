<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{
    public function register(Request $request)
    {
        $rules = [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ];
        $validator = Validator::make($request->all(),$rules);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ],400);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role = 'customer';
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => "You have registered successfully",
        ],200);
    }
    
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

        if(Auth::attempt(['email' => $request-> email,'password' => $request->password],true)) {
            
            $user = User::find(Auth::user()->id);
                
                $token = $user->createToken('token')->plainTextToken;
            
                return response()->json([
                    'status' => 200,
                    'token' => $token,
                    'id' => $user->id,
                    'name' =>$user->name,
                ],200);

        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Either email/password is incorrect.'
            ],401);
        }
    }

    public function show(){
 
        $user = User::all();

        return response()->json([
            'status' => 200,
            'data' => $user
        ]);
    }

    //To display user information on the user panel
    public function show_2($id){

        $user = User::where('role', '!=' ,'admin')
                    ->where('id' ,$id)          
                    ->get();

        return response()->json([
            'status' => 200,
            'data' => $user
        ]);
    }

    //This method is to validate old pwd and save new pwd
    public function changePassword(Request $request)
    {
        // Get authenticated user
        $user = User::find(Auth::user()->id);

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Validate input
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required|min:6|confirmed', // Ensure new password is confirmed
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if old password matches
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json(['message' => 'Old password is incorrect'], 400);
        }
        
        // Update password
        $user->password = Hash::make($request->new_password);
        $user->save(); // Save changes

        return response()->json(['message' => 'Password updated successfully'], 200);
    }

    //To update the profile details
    public function updateProfile(Request $request)
    {
        $user = User::find($request->user()->id);

        if($user == null)
        {
            return response()->json([
                'status' => 404,
                'message' => 'User not found',
                'data' => []
            ],404);
        }

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$request->user()->id.',id',
            'city' => 'required|max:100',
            'state' => 'required|max:100',
            'zip' => 'required|max:100',
            'mobile' => 'required|max:100',
            'address' => 'required|max:200',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ],400);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->city = $request->city;
        $user->state = $request->state;
        $user->zip = $request->zip;
        $user->mobile = $request->mobile;
        $user->address = $request->address;
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'Profile Updated',
            'data' => $user
        ],200);
    }

    public function getAccountdetails(Request $request){
        $user = User::find($request->user()->id);

        if ($user == null) {
            return response()->json([
                'status' => 400,
                'message' => 'User not found',
                'data' => []
            ],400);
        }
        else{
            return response()->json([
                'status' => 200,
                'data' => $user
            ],200);
        }
    }
}
