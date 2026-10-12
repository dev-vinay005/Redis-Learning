import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: '9TOtoaOkdZ4B3DlLJdajdarV4wYWpA10',
    socket: {
        host: 'redis-18632.crce300.ap-south-1-2.ec2.cloud.redislabs.com',
        port: 18632
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar123werwsdfsdafsdae');

const key = `rate_limit:{ip}$`
// await client.del(key)
await client.incr(key)
const result = await client.get('foo');
console.log(result)  // >>> bar

