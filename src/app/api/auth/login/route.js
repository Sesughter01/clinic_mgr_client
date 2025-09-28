import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

// _mock
import { _users, JWT_SECRET, JWT_EXPIRES_IN } from 'src/_mock/_auth';

export async function POST(request) {
  try {
    console.log('LOGIN REE: ');
    const { email, password } = await request.json();

    const user = _users.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { message: 'There is no user corresponding to the email address.' },
        { status: 400 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json({ message: 'Wrong password' }, { status: 400 });
    }

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return NextResponse.json({ accessToken, user });
  } catch (error) {
    console.error('[Auth API]: ', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
