<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BrinquedosController;
use App\Http\Controllers\TiposBrinquedosController;
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

Route::middleware(['auth'])->group(function () {
    Route::get('/brinquedos', [BrinquedosController::class, 'index'])->name('brinquedos');
    Route::get('/brinquedosForm/{id?}', [BrinquedosController::class, 'form'])->name('brinquedosForm');
    Route::post('/brinquedosStore', [BrinquedosController::class, 'store'])->name('brinquedosStore');
    Route::put('/brinquedosUpdate/{id}', [BrinquedosController::class, 'update'])->name('brinquedosUpdate');
    Route::delete('/brinquedos/{brinquedo}', [BrinquedosController::class, 'destroy'])->name('brinquedosDelete');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/tiposBrinquedos', [TiposBrinquedosController::class, 'index'])->name('tiposBrinquedos');
    Route::get('/tipoBrinquedo/{id?}', [TiposBrinquedosController::class, 'form'])->name('tipoBrinquedo');
    Route::post('/tipoBrinquedoSave', [TiposBrinquedosController::class, 'store'])->name('tipoBrinquedoSave');
    Route::put('/tiposBrinquedos/{id?}', [TiposBrinquedosController::class, 'update'])->name('tipoBrinquedoSave');
    Route::delete('/tiposBrinquedos', [TiposBrinquedosController::class, 'destroy'])->name('tipoBrinquedoDelete');
});

require __DIR__.'/auth.php';