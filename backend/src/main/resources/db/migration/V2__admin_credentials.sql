-- Switches the seeded admin login from admin@studio.local/ChangeMe123! to admin/admin.
UPDATE manager
SET email = 'admin', password_hash = '$2y$10$GXxEucL2.qZ5TK/1kZ8G6O5p.JbPwPd8VSH9.WpmJLqCYLPYmlXiS'
WHERE email = 'admin@studio.local';
