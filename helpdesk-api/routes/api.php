<?php

use App\Http\Controllers\Api\InquiryController;
use Illuminate\Support\Facades\Route;

// 問い合わせ API（認証なし）
Route::get('/inquiries', [InquiryController::class, 'index']);
Route::post('/inquiries', [InquiryController::class, 'store']);
Route::put('/inquiries/{inquiry}', [InquiryController::class, 'update']);
Route::delete('/inquiries/{inquiry}', [InquiryController::class, 'destroy']);
