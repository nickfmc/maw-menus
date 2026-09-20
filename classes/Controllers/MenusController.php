<?php

declare(strict_types=1);

namespace Grav\Plugin\MawMenus\Controllers;

use Grav\Plugin\Api\Controllers\AbstractApiController;
use Grav\Plugin\Api\Exceptions\ForbiddenException;
use Grav\Plugin\Api\Response\ApiResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

/**
 * /api/v1/maw-menus/*
 */
class MenusController extends AbstractApiController
{
    private const READ  = 'api.menus.read';
    private const WRITE = 'api.menus.write';

    /**
     * Menus are site structure, so they have their own permission. But a hard cut would lock out every
     * account that exists today, none of which has been granted api.menus.*, so page-write is accepted as
     * a fallback. Drop the fallback once sites have assigned the new permission.
     */
    protected function requireMenus(ServerRequestInterface $request, string $permission): void
    {
        try {
            $this->requirePermission($request, $permission);
        } catch (ForbiddenException) {
            $this->requirePermission($request, 'api.pages.write');
        }
    }

    /** GET /maw-menus/menus */
    public function index(ServerRequestInterface $request): ResponseInterface
    {
        $this->requireMenus($request, self::READ);

        return ApiResponse::create([]);
    }
}
