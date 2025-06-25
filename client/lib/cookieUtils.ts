export const setCookie = (
  name: string,
  value: string,
  days: number = 1
) => {
  const expires = new Date();
  expires.setTime(
    expires.getTime() + days * 24 * 60 * 60 * 1000
  );
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};path=/;expires=${expires.toUTCString()};secure=${
    process.env.NODE_ENV === "production"
  };sameSite=strict`;
};

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.trim());
  const cookie = cookies.find((c) =>
    c.startsWith(`${name}=`)
  );
  return cookie
    ? decodeURIComponent(cookie.substring(name.length + 1))
    : null;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;secure=${
    process.env.NODE_ENV === "production"
  };sameSite=strict`;
};
