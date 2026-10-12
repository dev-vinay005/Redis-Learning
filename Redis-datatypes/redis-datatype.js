// Learning about Redis Data Types and Redis Commands

// Some General purpose commands in Redis:
// 1. KEYS: It is used to get all the keys matching a pattern.
// 2. EXISTS: It is used to check if a key exists or not.
// 3. DEL: It is used to delete a key.
// 4. EXPIRE: It is used to set a timeout on a key.
// 5. TTL: Shows how much time is left before a key expires. Example: TTL user:1 → returns remaining seconds.

// Type of Redis Data Types:
// 1. String
// 2. List
// 3. Set
// 4. Sorted Set
// 5. Hash
// 6. Stream

import { client } from './redisConnection.js';

// 1. String: String Redis ka sabse basic data type hai.
// Commands
// SET user:name:123 "Sara"
// MSET:multiple set
// GET user:name:123
// DEL user:name:123

// await client.set('name', 'Sara');
// await client.set('age', 105, {
//     // EX: 60, // Expire in 60 seconds
// });

// await client.mSet({ 'name': 'nagrani', 'age': '25' });
// await client.del('name');
// await client.del(['name', 'age']);
// const result = await client.get('name');
// const result = await client.mGet(['name', 'age'])
// await client.expire('age', 60) // expire in 60 seconds
// console.log(await client.ttl('age')) // tell us the time to live of the key in seconds=


// 2. List: List Redis ka second data type hai. Ye ek ordered collection (array jaisa) of strings hai. Isme duplicate values allowed hai. Isme hum elements ko head ya tail se add kar sakte hai. EX: Skills: ["JavaScript", "Python", "Java", "C++"]
// Left ["JavaScript", "Python", "Java", "C++"] Right

// Commands
// ['javascript']
// 1) LPUSH (Left push): add element to Left (head) of the list =
// ["python","javascript"]
// 2) RPUSH (Right push): add element to Right (tail) of the list = // ["javascript","python"]
// 3) LPOP (Left pop): remove element from Left (head) of the list
// 4) RPOP (Right pop): remove element from Right (tail) of the list
// 5) lRange (list range): get all the elements of the list
// 6) lRange: EX => lRange(listName, startIndex, endIndex) → lRange('skills', 0, -1) → get all the elements of the list
// 7) llen = await client.lLen('skills'); // get the length of the list
// 8) lIndex: EX => lIndex(listName, index) → lIndex('skills', 0) → get the first element of the list


// await client.lPush('TechSkills', 'nodejs');
// await client.lPush('TechSkills', 'python');
// await client.rPush('TechSkills', 'java');
// await client.lPop('TechSkills');
// await client.del("TechSkills")
// const Liskills = await client.lPush('TechSkills', ['JavaScript', 'Node.js', 'Redis', 'MongoDB']);
// const getSkills = await client.lRange('TechSkills', 0, -1); // get all the elements of the list
// const listLength = await client.lLen('TechSkills'); // get the length of the list
// console.log(getSkills);
// console.log(listLength);

// 3) Set: Set Redis ka third data type hai.Ye ek unordered collection of unique strings hai.Isme duplicate values allowed nahi hai.EX: Skills: ["JavaScript", "Python", "Java", "C++"]
// - duplicate values not allowed
// - order fix nhi hota
// - faster than list. because set uses hash table to store the elements, while list uses linked list to store the elements. So, set is faster than list because it does not have to maintain the order of elements.

// difference between list and set:
// 1) List is an ordered collection of strings, while Set is an unordered collection of unique strings.
// 2) List allows duplicate values, while Set does not allow duplicate values.
// 3) List is slower than Set because it has to maintain the order of elements, while Set is faster because it does not have to maintain the order of elements.

// Commands
// 1) SADD: add element to the set
// 2) SREM: remove element from the set
// 3) SMEMBERS: get all the elements of the set
// 4) SISMEMBER: check if an element exists in the set or not
// 5) SINTER: get the intersection of two sets means the common elements of two sets syntex: SINTER(set1, set2) it returns the common elements of two set1 and set2
// 6) SCARD: get the number of elements in the set

// await client.sAdd('skills', 'JavaScript');
// await client.sAdd('skills', 'Python');
// await client.sAdd('skills', 'Java');
// await client.sAdd('skills', ['Node.js', 'Redis', 'MongoDB']); // add multiple elements to the set at once
// const removedElement = await client.sRem('skills', 'Redis'); // remove element from the set
// console.log(removedElement);
// const getSkills = await client.sMembers('skills'); // get all the elements of the set
// console.log("Getting all skills", getSkills);
// const isMember = await client.sIsMember('skills', 'Python'); // check if an element exists in the set or not
// console.log("checking is exists", isMember);


// 4) Sorted Set: Sorted Set Redis ka fourth data type hai.Ye ek ordered collection of unique strings hai.Isme duplicate values allowed nahi hai.Isme har element ke saath ek score bhi hota hai, jo ki uske order ko define karta hai.EX: Skills: ["JavaScript", "Python", "Java", "C++"]

// - Duplicate values allowed nahi hote.
// - Order score ke basis par fixed hota hai.
// - List aur Set se faster hota hai, kyunki Sorted Set elements ko skip list mein store karta hai, jabki List elements ko linked list mein aur Set elements ko hash table mein store karta hai.Isliye Sorted Set, List aur Set se faster hota hai kyunki ise elements ka order maintain nahi karna padta.

// Set aur Sorted Set mein difference:

// - Set ek unordered collection of unique strings hota hai, jabki Sorted Set ek ordered collection of unique strings hota hai.

// - Set mein har element ke saath koi score associated nahi hota, jabki Sorted Set mein har element ke saath ek score associated hota hai.

// - Set, Sorted Set se slower hota hai kyunki ise elements ka order maintain karna padta hai, jabki Sorted Set faster hota hai kyunki ise elements ka order maintain nahi karna padta.

// Commands
// 1) ZADD: add element to the sorted set
// 2) ZREM: remove element from the sorted set
// 3) ZRANGE: get all the elements of the sorted set in smaller to larger order
// 4) ZREVRANGE: get all the elements of the sorted set in larger to smaller order
// 5) ZRANK: get the rank of an element in the sorted set means the position of the element in the sorted set in smaller to larger order

// 6) ZSCORE: get the score of an element in the sorted set
// 7) ZCARD: get the number of elements in the sorted set


// await client.zAdd('students', { score: 1, value: 'vinay' });
// await client.zAdd("students", [{ score: 2, value: 'punit' }, { score: 3, value: 'karan' }]);

// const getStudents = await client.zRange('students', 0, -1); // get all the elements of the sorted set in smaller to larger order
// console.log("Getting all students in ascending order", getStudents);

// const getStudentsReverse = await client.zRange('students', 0, -1, { REV: true }); // get all the elements of the sorted set in larger to smaller order
// console.log("Getting all students in descending order", getStudentsReverse);

// const getScore = await client.zScore('students', 'vinay'); // get the score of an element in the sorted set
// console.log("Getting score of vinay", getScore);

// const getRank = await client.zRank('students', 'karan'); // get the rank of an element in the sorted set
// console.log("Getting rank of karan", getRank);
// console.log(await client.zCard('students')) // get the number of elements in the sorted set

// 5) Hash: Hash Redis ka fifth data type hai.Ye ek unordered collection of key-value pairs hai.Isme duplicate keys allowed nahi hai.
// EX: User: {
// name: "Sara",
//  age: 25, city:
// "New York"
// }

//- duplicate keys allowed nahi hote.
//- order fix nahi hota.
//- List aur Set se faster hota hai, kyunki Hash elements ko hash table mein store karta hai, jabki List elements ko linked list mein aur Set elements ko hash table mein store karta hai.Isliye Hash, List aur Set se faster hota hai kyunki ise elements ka order maintain nahi karna padta.

// commands
// 1) HSET: add key-value pair to the hash
// 2) HGET: get the value of a key in the hash
// 3) HDEL: remove a key-value pair from the hash
// 4) HGETALL: get all the key-value pairs in the hash
// 5) HEXISTS: check if a key exists in the hash or not
// 6) HLEN: get the number of key-value pairs in the hash
// 7) HKEYS: get all the keys in the hash
// 8) HVALUES: get all the values in the hash
// 9) HINCRBY: increment the value of a key in the hash by a given number
// const user = await client.hSet('user:1', { name: 'vikash', RollNo: 1240150023, age: 20, city: 'Lucknow' }); // add key-value pair to the hash
// console.log("Adding user", user);

// const getUserAge = await client.hGet('user:1', 'age'); // get the value of a key in the hash
// console.log("Getting user age", getUserAge);

// const getUser = await client.hGetAll('user:1'); // get all the key-value pairs in the hash
// console.log("Getting user", getUser);

// const isUserExists = await client.hExists('user:1', 'age'); // check if a key exists in the hash or not
// console.log("Checking if user exists", isUserExists);

// const userLength = await client.hLen('user:1'); // get the number of key-value pairs in the hash
// console.log("Getting user length", userLength);

// const userKeys = await client.hKeys('user:1'); // get all the keys in the hash
// console.log("Getting user keys", userKeys);

// const userValues = await client.hVals('user:1'); // get all the values in the hash
// console.log("Getting user values", userValues);

// const incrementUserAge = await client.hIncrBy('user:1', 'age', 5); // increment the value of a key in the hash by a given number
// console.log("Incrementing user age", incrementUserAge);

// const decrementUserAge = await client.hIncrBy('user:1', 'age', -5); // decrement the value of a key in the hash by a given number
// console.log("Decrementing user age", decrementUserAge);

// console.log(await client.hDel("user:2", "age")) // this will delete age field from the user:2 hash