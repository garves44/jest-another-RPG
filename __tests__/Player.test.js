const Player = require('../lib/Player');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');

test('creates a player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

test('gets player stats as an object', () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
})

test('gets players health value', () => {
    const player = new Player('Dave');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test('checks if player is still alive', () => {
    const player = new Player('dave');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

test('subrtracts from player health', () => {
    const player = new Player('dave');
    const oldhealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldhealth - 5);

    player.reduceHealth(9999999);
    
    expect(player.health).toBe(0);
});

test('gets player attack value', () => {
    const player = new Player('dave');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

test('adds a potion to player inventory', () => {
    const player = new Player('dave');
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());

    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test('uses a potion from player inventory', () => {
    const player = new Player('dave');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    expect(player.inventory.length).toBeLessThan(oldCount);
});