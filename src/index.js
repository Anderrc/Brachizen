#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import chalk from 'chalk';

const configPath = './.branchizenrc.json';

const standardBranchName = {
    "compact-dev": {
        "description": "Enfocado en ramas cortas para desarrollo, sin demasiados metadatos.",
        "order": ["description", "user"],
        "questions": {
            "description": "Describe brevemente la tarea o funcionalidad (usa snake_case):",
            "user": "Ingresa tu identificador o nombre de usuario (ej: jdoe):"
        },
        "pattern": "feature/[description]_[user]"
    },
    "detailed-tracking": {
        "description": "Pensado para flujos donde se requiere trazabilidad completa de quién, qué y cuándo.",
        "order": ["prefix", "description", "user", "date"],
        "questions": {
            "prefix": "Área o contexto del cambio (ej: HOTFIX, CORE, UI):",
            "description": "Explica claramente el propósito del cambio (usa snake_case):",
            "user": "Nombre o alias del responsable del cambio (ej: mrivera):",
            "date": "Fecha del cambio en formato YYYYMMDD (ej: 20250612):"
        },
        "pattern": "bugfix/[prefix]_[description]_[user]_[date]"
    },
    "release-heavy": {
        "description": "Ramas orientadas a releases, incluye versión y fecha de despliegue",
        "order": ["version", "description", "date"],
        "questions": {
            "version": "Número de versión (ej: v1.2.3):",
            "description": "Nombre o cambio principal del release (usa snake_case):",
            "date": "Fecha planificada (YYYYMMDD):"
        },
        "pattern": "release/[version]_[description]_[date]"
    },
    "ticket-centric": {
        "description": "Ramas centradas en el identificador del ticket (ideal para integraciones con JIRA o Linear)",
        "order": ["ticket", "description", "user"],
        "questions": {
            "ticket": "ID del ticket o tarea (ej: JIRA-123, TASK-456):",
            "description": "Descripción breve de la tarea (usa snake_case):",
            "user": "Tu nombre de usuario o alias:"
        },
        "pattern": "[ticket]_[description]_[user]"
    },
    "squad-structured": {
        "description": "Ideal para equipos grandes: incluye célula, propósito, autor y fecha",
        "order": ["squad", "description", "user", "date"],
        "questions": {
            "squad": "Nombre de la célula o equipo (ej: payments, auth, core-ui):",
            "description": "Breve descripción del cambio (usa snake_case):",
            "user": "Nombre o alias del autor de la rama:",
            "date": "Fecha del cambio (YYYYMMDD):"
        },
        "pattern": "feature/[squad]_[description]_[user]_[date]"
    }
}

function loadConfig() {
    try {
        if (fs.existsSync(configPath)) {
            const content = fs.readFileSync(configPath, 'utf-8');
            return JSON.parse(content);
        }
    } catch (e) {
        console.error('Error al leer configuración:', e);
    }
    return {
        order: ['description', 'user'],
        questions: {
            description: "Descripción (en snake_case):",
            user: "Tu nombre de usuario:",
        }

    };
}

function saveConfig(config) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

async function configure() {
    const config = loadConfig();

    console.log(chalk.bold(
        `Configuración actual: ${chalk.bold.blue(config["standard-branch-name"])}\n
        `
    ));
    const response = await inquirer.prompt({
        type: 'confirm',
        name: 'isChange',
        message: 'Desea cambiar la configuración?',
    })

    if (response.isChange) {
        const standardChoices = Object.entries(standardBranchName).map(([key, value]) => ({
            name: `${chalk.green.bold(key)} ${chalk.blue.bold('-')} ${chalk.gray(value.description) || 'Sin descripción'} ${chalk.blue.bold('-')} ${chalk.gray(value.pattern)}`,
            value: key,
        }));
        const standard = await inquirer.prompt({
            type: 'list',
            name: 'standardBranchName',
            message: 'Nombre de la rama estándar:',
            choices: standardChoices,
        })

        saveConfig({
            ...standardBranchName[standard.standardBranchName],
            "standard-branch-name": standard.standardBranchName
        });
        console.log('\n✅ Configuración guardada en', standard.standardBranchName);


        console.log(chalk.bold(
            `\n✅ Puedes hacer cambios a tu gusto en el archivo ${chalk.green.bold(configPath)}\n`
        ));
        return;

    }
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
        const messageMap = config.questions

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
            console.log('✅ Rama creada.');
            console.log(`🍺 git checkout -b ${branch}`);
        } else {
            console.log('❌ Rama no creada.');
        }
    }
    catch (error) {
        console.log('❌ Error al crear la rama.');
    }
}

function printProjectHeader() {
    console.clear();

    let version = '0.0.0';
    let name = 'Branchizen';
    let author;

    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const packagePath = path.join(__dirname, '../package.json');

        if (fs.existsSync(packagePath)) {
            const content = fs.readFileSync(packagePath, 'utf-8');
            const pkg = JSON.parse(content);
            version = pkg.version || version;
            name = pkg.name || name;
            author = pkg.author || author;
        }
    } catch (e) {
        console.error('❌ Error leyendo package.json:', e);
    }
    const logo = `
    ______                      _     _               
    | ___ \\                    | |   (_)              
    | |_/ /_ __ __ _ _ __   ___| |__  _ _______ _ __  
    | ___ \\ '__/ _\` | '_ \\ / __| '_ \\| |_  / _ \\ '_ \\ 
    | |_/ / | | (_| | | | | (__| | | | |/ /  __/ | | |
    \\____/|_|  \\__,_|_| |_|\\___|_| |_|_/___\\___|_| |_|
    `;
    const banner = `
    ${logo}

     :: ${chalk.green(name)} ::       (${chalk.gray('v' + version)})
     By ${chalk.blue.bold(author)}
`;

    console.log(banner);
}

// Comando principal
const [, , command] = process.argv;

if (command === 'config') {
    printProjectHeader();
    configure();
} else {
    printProjectHeader();
    createBranch();
}
