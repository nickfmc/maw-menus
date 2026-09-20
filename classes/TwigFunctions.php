<?php

declare(strict_types=1);

namespace Grav\Plugin\MawMenus;

use Twig\Environment;
use Twig\TwigFunction;

/**
 * The two Twig functions a theme uses. Split out from the plugin class so tests can register them
 * against a bare Environment.
 *
 * They are deliberately separate functions: a theme needs to tell "no menu of that name exists"
 * (fall back to its own navigation) from "the menu exists and the editor emptied it" (render nothing).
 */
final class TwigFunctions
{
    /** Container flag, also used by maw-starter to skip its own no-op stubs. */
    public const REGISTERED = 'maw_menus';

    public static function register(Environment $env, MenuResolver $resolver): void
    {
        // The id is optional: with none, both fall back to the plugin's "main menu" setting, so a theme
        // can support menus without inventing a naming convention of its own.
        $env->addFunction(new TwigFunction(
            'maw_menu',
            static fn (string $id = '', array $options = []): array => $resolver->nodes($id, $options)
        ));
        $env->addFunction(new TwigFunction(
            'maw_menu_exists',
            static fn (string $id = ''): bool => $resolver->exists($id)
        ));
    }
}
