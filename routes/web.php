<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BrinquedosController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/cliente', [ClienteController::class, 'index'])->name('cliente.index');
    Route::get('/cliente/{cliente}', [ClienteController::class, 'edit'])->name('cliente.edit');
    Route::patch('/cliente', [ClienteController::class, 'update'])->name('cliente.update');
    Route::delete('/cliente', [ClienteController::class, 'destroy'])->name('cliente.destroy');
});


// Route::get('/brinquedos', [BrinquedosController::class, 'index'])
//     ->middleware(['auth', 'verified'])
//     ->name('brinquedos');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/brinquedos', [BrinquedosController::class, 'index'])->name('brinquedos');
    Route::get('/brinquedosForm/{id?}', [BrinquedosController::class, 'form'])->name('brinquedosForm');
    Route::post('/brinquedos', [BrinquedosController::class, 'store'])->name('brinquedosSave');
    Route::put('/brinquedos/{id?}', [BrinquedosController::class, 'update'])->name('brinquedosSave');
    // Route::get('/brinquedos/{brinquedo}', [BrinquedosController::class, 'edit'])->name('brinquedos');
    // Route::patch('/brinquedos/{brinquedo}', [BrinquedosController::class, 'update'])->name('brinquedos');
    Route::delete('/brinquedos/{brinquedo}', [BrinquedosController::class, 'destroy'])->name('brinquedosDelete');
});

require __DIR__.'/auth.php';
