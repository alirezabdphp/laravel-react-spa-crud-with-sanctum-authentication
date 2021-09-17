<?php


namespace App\Traits;

trait ResponseControlTrait
{
    public function sendResponse($data, $message)
    {
        $response = [
            "status" => 200,
            "data" => $data,
            "message" => $message,
        ];
        return response()->json($response, 200);
    }

    public function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            "status" => $code,
            "message" => $error,
        ];
        if (!empty($errorMessages)) {
            $response["data"] = $errorMessages;
        }
        return response()->json($response, $code);
    }
}
