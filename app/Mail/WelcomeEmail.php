<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Config;

class WelcomeEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $resetLink;
    public $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data, $resetLink)
    {
        $this->data = $data;
        $this->resetLink = $resetLink;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $url = $this->resetLink;

        $message = $this->buildMailMessage($url);

        return $this->view('vendor.mail.html.layout')
            ->with([
                'username' => $this->data['name'],
                'email' => $this->data['email'],
                'password' => $this->data['password'],
                'message' => $message
            ])
            ->subject('Welcome to My App!');
    }

    protected function buildMailMessage($url)
    {
        $minutes = Config::get('auth.passwords.' . Config::get('auth.defaults.passwords') . '.expire');
        $expireMessage = sprintf('This password reset link will expire in %d minutes.', $minutes);

        return $this->line('You are receiving this email because you have been registered on our website.')
            ->line('Your username: ' . $this->data['name'] . ' Your email: ' . $this->data['email'] . '; Your password: ' . $this->data['password'])
            ->line($expireMessage)
            ->action('Reset Password', $url)
            ->line('If you did not request a password reset, no further action is required.');
    }
}