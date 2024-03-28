// const { createClient } = require("redis");

// const client = await createClient ({
//     host: 'redis-19618.c1.asia-northeast1-1.gce.cloud.redislabs.com',
//     port: 38397,
//     password: 'be41be659f174cf287978f6e72a15e75',
//     username: 'default'
// }).connect();

// client.set('foo','bar');
const Redis = require("ioredis");
const client = new Redis("rediss://default:be41be659f174cf287978f6e72a15e75@intense-doberman-38397.upstash.io:38397");

client.set('foo', 'newbar');
client.get('foo', function (err, result) {
    console.log(result);
});
