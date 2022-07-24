test('env', () => {
     expect(process.env.FOO).toBe('FOO');
     expect(global.bar).toBe('bar');
   });