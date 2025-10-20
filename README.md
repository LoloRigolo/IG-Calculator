This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 1. Installer Git et Node.js / npm

Ouvre un terminal et tape :

```bash
sudo apt update
sudo apt install git nodejs npm -y
```

Vérifie que tout est bien installé :

```bash
git --version
node -v
npm -v
```

## 2. Cloner le dépôt GitHub

Va dans le dossier où tu veux placer le projet, par exemple dans ton
dossier personnel :

```bash
cd ~
git clone https://github.com/LoloRigolo/IG-Calculator.git
```

Ensuite entre dans le dossier cloné :

```bash
cd IG-Calculator
```

## 3. Installer les dépendances du projet

Dans le dossier du projet, exécute :

```bash
npm install
```

Cela va lire le fichier `package.json` et télécharger toutes les
dépendances nécessaires.

## 4. Lancer le projet

Tu peux le lancer avec :

```bash
npm run dev
```

## 5. Accéder à ton projet

S'il s'agit d'une application web locale, le terminal affichera souvent
quelque chose comme :

    Server running at http://localhost:3000

Tu peux alors ouvrir cette adresse dans ton navigateur.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
