// PLEASE READ README.md BEFORE MAKING ANY CHANGES. JOIN THE SUPPORT SERVER FROM SUPPORT.md

const { readdirSync } = require('fs');

module.exports = (client) => {
	readdirSync('./Events/').forEach((dir) => {
		const events = readdirSync(`./Events/${dir}/`).filter((f) =>
			f.endsWith('.js'),
		);
		for (const file of events) {
			const event = require(`../../Events/${dir}/${file}`);

			client.events++;

			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args, client));
			}
			else {
				client.on(event.name, (...args) => event.execute(...args, client));
			}
		}
	});
};
