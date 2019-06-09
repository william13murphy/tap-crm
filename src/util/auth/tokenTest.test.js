import tokenTest from './tokenTest';

// Tests the function, when the token has an errorObject in it
test('test the tokenTest function, when the errorObject.statusText is "error" ', () => {
  let token = {
    errorObject: {
      statusText: 'error',
    },
  };

  const result = tokenTest(token);
  expect(result).toEqual({ error: 'The server timed out.', valid: false });
});

// Tests the function, when the token has an errorObject.statusText is empty, with a valid role.
test('test the tokenTest function, when the errorObject.statusText is none, with a valid role', () => {
  let token = {
    errorObject: {
      statusText: 'random',
    },
  };

  const result = tokenTest(token);
  expect(result).toEqual({
    valid: false,
    error: 'random',
  });
});

// Tests the function, when the role is none
test('test the tokenTest function, when the Role is none', () => {
  let token = {
    expires: 'Thu, 13 Sep 2018 03:17:05 GMT',
    issued: 'Thu, 30 Aug 2018 03:17:05 GMT',
    ClientId: '',
    FirstLogin: 'False',
    POS: '1',
    Role: '',
    SchoolId: '73436952-50c9-4eaa-9c60-5a6b76fa6603',
    StudentId: '6a79ee79-d0c5-49c7-93a6-caef97312d8d',
    TimeZone: '-05:00:00',
    UserId: '214a4456-1c11-4c57-8e35-df67922467d9',
    UserName: 'schooladmincoastal',
    access_token:
      '11AwvT6uaBp5aT9H2z2hWM-aX-GDiSSRJc2IgU5CL_dMQB6FWRMsXAT8HN9K5jUV5AZ-BHIdOYTd8uISku8d36MI7qcOlgqM2kCn6HRTSwOn1KR5Vr1sxhWCjIsVqOtv4PsrgM9FYqbMYHKRSpE9OhTFbJ-E956Z94x9zdKutAgYNrD_Ma8e7rD8Lmjf4bREK5JCoU2MnepCEYpMEvk2MYR5hy9X465qm7wH0lpw8Y_pWr29zw5HwLhMSRm3SURSXB9EM-MJipN6Z3Wm7YvponHUrz94KH_UQmCk-aLxQEploVhiTEo2y83Q5BRGSO_ZA5pNtwpOCU7gK0GDoguCMhJlEeK-Z1B9LtlZSkUWxplVHDKEadBo9fC3ccsguuI6qqrdWEtINcI_AfUCPLymqTBQOS3JWDJzv2pAhj313BlSJ6T9DIt4XHEUchWkwGm6HZQmLHaPNmcpaGHx1q3FvN32gKCSj3hGRxbu43pscEyAz45upV0fl8HC6Zux4QGv62B7Y12uqir5_yvf-CA1Kr5SWhLIo5lvu7o0ddVT0BPY9mBcaTTB_lBPzBLZHi1ziCVrd4FOKtqfmwZqbGsxthztrzTImjywazWYyAjaOAjE7PExoc2Euv_SkQQZeX_dAOONyx2pfzTT55QZkIA6JYQckZ5syp_Sv3JSMNPTziVLFnIVVJ2SkMSBhX5Nzud5Mcgivw',
    expires_in: 1209599,
    token_type: 'bearer',
  };

  const result = tokenTest(token);
  expect(result).toEqual({
    valid: false,
    error: 'Token is missing the Role attribute.',
  });
});

// Tests the function, when all the token attributes are valid
test('test the tokenTest function, when there is no errorObject and all the other attributes are valid', () => {
  let token = {
    expires: 'Thu, 13 Sep 2018 03:17:05 GMT',
    issued: 'Thu, 30 Aug 2018 03:17:05 GMT',
    ClientId: '',
    FirstLogin: 'False',
    POS: '1',
    Role: 'SCHADMIN',
    SchoolId: '73436952-50c9-4eaa-9c60-5a6b76fa6603',
    StudentId: '6a79ee79-d0c5-49c7-93a6-caef97312d8d',
    TimeZone: '-05:00:00',
    UserId: '214a4456-1c11-4c57-8e35-df67922467d9',
    UserName: 'schooladmincoastal',
    access_token:
      '11AwvT6uaBp5aT9H2z2hWM-aX-GDiSSRJc2IgU5CL_dMQB6FWRMsXAT8HN9K5jUV5AZ-BHIdOYTd8uISku8d36MI7qcOlgqM2kCn6HRTSwOn1KR5Vr1sxhWCjIsVqOtv4PsrgM9FYqbMYHKRSpE9OhTFbJ-E956Z94x9zdKutAgYNrD_Ma8e7rD8Lmjf4bREK5JCoU2MnepCEYpMEvk2MYR5hy9X465qm7wH0lpw8Y_pWr29zw5HwLhMSRm3SURSXB9EM-MJipN6Z3Wm7YvponHUrz94KH_UQmCk-aLxQEploVhiTEo2y83Q5BRGSO_ZA5pNtwpOCU7gK0GDoguCMhJlEeK-Z1B9LtlZSkUWxplVHDKEadBo9fC3ccsguuI6qqrdWEtINcI_AfUCPLymqTBQOS3JWDJzv2pAhj313BlSJ6T9DIt4XHEUchWkwGm6HZQmLHaPNmcpaGHx1q3FvN32gKCSj3hGRxbu43pscEyAz45upV0fl8HC6Zux4QGv62B7Y12uqir5_yvf-CA1Kr5SWhLIo5lvu7o0ddVT0BPY9mBcaTTB_lBPzBLZHi1ziCVrd4FOKtqfmwZqbGsxthztrzTImjywazWYyAjaOAjE7PExoc2Euv_SkQQZeX_dAOONyx2pfzTT55QZkIA6JYQckZ5syp_Sv3JSMNPTziVLFnIVVJ2SkMSBhX5Nzud5Mcgivw',
    expires_in: 1209599,
    token_type: 'bearer',
  };

  const result = tokenTest(token);
  expect(result).toEqual({ valid: true });
});

// Tests the function, with an invalid role
test('test the tokenTest function, with an invalid role', () => {
  let token = {
    expires: 'Thu, 13 Sep 2018 03:17:05 GMT',
    issued: 'Thu, 30 Aug 2018 03:17:05 GMT',
    ClientId: '',
    FirstLogin: 'False',
    POS: '1',
    Role: 'SUPERADMIN',
    SchoolId: '73436952-50c9-4eaa-9c60-5a6b76fa6603',
    StudentId: '6a79ee79-d0c5-49c7-93a6-caef97312d8d',
    TimeZone: '-05:00:00',
    UserId: '214a4456-1c11-4c57-8e35-df67922467d9',
    UserName: 'schooladmincoastal',
    access_token:
      '11AwvT6uaBp5aT9H2z2hWM-aX-GDiSSRJc2IgU5CL_dMQB6FWRMsXAT8HN9K5jUV5AZ-BHIdOYTd8uISku8d36MI7qcOlgqM2kCn6HRTSwOn1KR5Vr1sxhWCjIsVqOtv4PsrgM9FYqbMYHKRSpE9OhTFbJ-E956Z94x9zdKutAgYNrD_Ma8e7rD8Lmjf4bREK5JCoU2MnepCEYpMEvk2MYR5hy9X465qm7wH0lpw8Y_pWr29zw5HwLhMSRm3SURSXB9EM-MJipN6Z3Wm7YvponHUrz94KH_UQmCk-aLxQEploVhiTEo2y83Q5BRGSO_ZA5pNtwpOCU7gK0GDoguCMhJlEeK-Z1B9LtlZSkUWxplVHDKEadBo9fC3ccsguuI6qqrdWEtINcI_AfUCPLymqTBQOS3JWDJzv2pAhj313BlSJ6T9DIt4XHEUchWkwGm6HZQmLHaPNmcpaGHx1q3FvN32gKCSj3hGRxbu43pscEyAz45upV0fl8HC6Zux4QGv62B7Y12uqir5_yvf-CA1Kr5SWhLIo5lvu7o0ddVT0BPY9mBcaTTB_lBPzBLZHi1ziCVrd4FOKtqfmwZqbGsxthztrzTImjywazWYyAjaOAjE7PExoc2Euv_SkQQZeX_dAOONyx2pfzTT55QZkIA6JYQckZ5syp_Sv3JSMNPTziVLFnIVVJ2SkMSBhX5Nzud5Mcgivw',
    expires_in: 1209599,
    token_type: 'bearer',
  };

  const result = tokenTest(token);
  expect(result).toEqual({
    valid: true,
  });
});

// Tests the function, with an empty SchoolId attribute
test('test the tokenTest function, with an empty SchoolId attribute', () => {
  let token = {
    expires: 'Thu, 13 Sep 2018 03:17:05 GMT',
    issued: 'Thu, 30 Aug 2018 03:17:05 GMT',
    ClientId: '',
    FirstLogin: 'False',
    POS: '1',
    Role: 'SCHADMIN',
    SchoolId: '',
    StudentId: '6a79ee79-d0c5-49c7-93a6-caef97312d8d',
    TimeZone: '-05:00:00',
    UserId: '214a4456-1c11-4c57-8e35-df67922467d9',
    UserName: 'schooladmincoastal',
    access_token:
      '11AwvT6uaBp5aT9H2z2hWM-aX-GDiSSRJc2IgU5CL_dMQB6FWRMsXAT8HN9K5jUV5AZ-BHIdOYTd8uISku8d36MI7qcOlgqM2kCn6HRTSwOn1KR5Vr1sxhWCjIsVqOtv4PsrgM9FYqbMYHKRSpE9OhTFbJ-E956Z94x9zdKutAgYNrD_Ma8e7rD8Lmjf4bREK5JCoU2MnepCEYpMEvk2MYR5hy9X465qm7wH0lpw8Y_pWr29zw5HwLhMSRm3SURSXB9EM-MJipN6Z3Wm7YvponHUrz94KH_UQmCk-aLxQEploVhiTEo2y83Q5BRGSO_ZA5pNtwpOCU7gK0GDoguCMhJlEeK-Z1B9LtlZSkUWxplVHDKEadBo9fC3ccsguuI6qqrdWEtINcI_AfUCPLymqTBQOS3JWDJzv2pAhj313BlSJ6T9DIt4XHEUchWkwGm6HZQmLHaPNmcpaGHx1q3FvN32gKCSj3hGRxbu43pscEyAz45upV0fl8HC6Zux4QGv62B7Y12uqir5_yvf-CA1Kr5SWhLIo5lvu7o0ddVT0BPY9mBcaTTB_lBPzBLZHi1ziCVrd4FOKtqfmwZqbGsxthztrzTImjywazWYyAjaOAjE7PExoc2Euv_SkQQZeX_dAOONyx2pfzTT55QZkIA6JYQckZ5syp_Sv3JSMNPTziVLFnIVVJ2SkMSBhX5Nzud5Mcgivw',
    expires_in: 1209599,
    token_type: 'bearer',
  };

  const result = tokenTest(token);
  expect(result).toEqual({
    valid: false,
    error: 'Token is missing the SchoolId attribute.',
  });
});
