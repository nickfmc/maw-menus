<?php

declare(strict_types=1);

namespace Grav\Plugin\MawMenus;

/**
 * Small filesystem helpers for the store.
 *
 * Deliberately a copy of maw-builder's file rather than a shared dependency: the two plugins install
 * independently, and neither may require the other to be present.
 */
final class Files
{
    /** Atomic write: readers never see a half-written file (temp file + rename). */
    public static function write(string $file, string $contents): void
    {
        $tmp = $file . '.' . bin2hex(random_bytes(4)) . '.tmp';
        if (file_put_contents($tmp, $contents, LOCK_EX) === false) {
            throw new \RuntimeException("Could not write {$file}");
        }
        if (!@rename($tmp, $file)) {
            // Windows can refuse to rename over a file another request has open: fall back to a locked write.
            @unlink($tmp);
            if (file_put_contents($file, $contents, LOCK_EX) === false) {
                throw new \RuntimeException("Could not write {$file}");
            }
        }
    }
}
