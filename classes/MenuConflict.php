<?php

declare(strict_types=1);

namespace Grav\Plugin\MawMenus;

/**
 * Someone else saved this menu between the editor loading it and pressing save.
 * Carries the current record so the admin can show what it would be overwriting.
 */
class MenuConflict extends \RuntimeException
{
    public function __construct(public readonly array $current)
    {
        $who = $current['updated_by'] ?? '';
        $when = $current['updated'] ?? 0;
        parent::__construct(sprintf(
            'This menu was changed%s%s after you opened it.',
            $who ? ' by ' . $who : '',
            $when ? ' at ' . date('H:i', (int) $when) : ''
        ));
    }

    public function record(): array
    {
        return $this->current;
    }
}
