DELETE FROM events WHERE user_uuid = (select uuid from users where login = 'login1');
DELETE FROM users WHERE login = 'login1' ;