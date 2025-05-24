#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';

const configPath = './.branchizenrc.json';

function loadConfig() {
    try {
        if (fs.existsSync(configPath)) {
            const content = fs.readFileSync(configPath, 'utf-8');
            return JSON.parse(content);
        }
    } catch (e) {
        console.error('Error al leer configuración:', e);
    }
    return { order: ['description', 'user'] }; // default
}

function saveConfig(config) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

async function configure() {
    const orderChoices = ['description', 'user'];

    const answer = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'order',
            message: 'Selecciona el orden de los campos:',
            choices: orderChoices.map(item => ({ name: item })),
            validate: (input) => input.length === 3 || 'Debes seleccionar los 3 campos en algún orden.',
        },
    ]);

    saveConfig({ order: answer.order });
    console.log('✅ Configuración guardada en', configPath);
}


const construct = (parts) => {
    let branch = "";
    parts.forEach((part, index) => {
        if (part.length > 0) {
            branch += `${part}`;
        }
        if (index < parts.length - 1) {
            branch += '_';
        }
    });

    return branch;
}

async function createBranch() {
    const config = loadConfig();

    const baseAnswers = await inquirer.prompt([
        {
            type: 'list',
            name: 'baseType',
            message: '¿Qué tipo de rama quieres crear?',
            choices: ['feature', 'bugfix', 'hotfix', 'release'],
        }
    ]);

    // Preguntas dinámicas según el orden del usuario
    const dynamicPrompts = config.order.map((key) => {
        const messageMap = {
            description: 'Descripción (en snake_case):',
            user: 'Tu nombre de usuario:',
        };

        return {
            type: 'input',
            name: key,
            message: messageMap[key],
        };
    });

    const dynamicAnswers = await inquirer.prompt(dynamicPrompts);

    const { baseType } = baseAnswers;
    const parts = config.order.map((key) => dynamicAnswers[key]);
    const branch = `${baseType}/${construct(parts)}`;

    console.log(`\n✅ Nombre de rama sugerido:\n${branch}\n`);

    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: '¿Deseas crear esta rama con Git?',
        },
    ]);

    try {
        if (confirm) {
            execSync(`git checkout -b ${branch}`, { stdio: 'inherit' });
        } else {
            console.log('❌ Rama no creada.');
        }
    }
    catch (error) {
        console.log('❌ Error al crear la rama.');
    }
}

// Comando principal
const [, , command] = process.argv;

if (command === 'config') {
    configure();
} else {
    createBranch();
}
