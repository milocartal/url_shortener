
# URL Shortener

Ce projet est une application web de raccourcissement d’URL construite avec Next.js, TypeScript et Tailwind CSS. Elle permet aux utilisateurs de générer des liens courts et de les gérer facilement.

## Fonctionnalités

- Création de liens courts personnalisés
- Liste des URLs raccourcies
- Redirection automatique via un slug
- Interface moderne avec Tailwind CSS
- API REST et TRPC pour la gestion des URLs
- Stockage des données via une base de données (configurable)

## Structure du projet


```text
components.json
eslint.config.js
next-env.d.ts
next.config.js
package.json
pnpm-lock.yaml
postcss.config.js
prettier.config.js
README.md
tsconfig.json
public/
	web-app-manifest-192x192.png
	web-app-manifest-512x512.png
src/
	env.js
	app/
		layout.tsx
		manifest.json
		page.tsx
		_components/
			create.tsx
			list.tsx
			ui/
				button.tsx
				context-menu.tsx
				form.tsx
				input.tsx
				label.tsx
				sonner.tsx
				tooltip.tsx
		[slug]/
			page.tsx
		api/
			trpc/
				[trpc]/
					route.ts
	lib/
		utils.ts
		models/
			Url.ts
	server/
		db.ts
		api/
			root.ts
			trpc.ts
			routers/
				url.ts
	styles/
		globals.css
	trpc/
		query-client.ts
		react.tsx
		server.ts
```

## Installation

1. **Cloner le dépôt**
```bash
git clone https://github.com/milocartal/url_shortener.git
cd url_shortener
```

2. **Installer les dépendances**

```bash
pnpm install # ou npm install
```

3. **Configurer les variables d’environnement**

	 Créez un fichier `.env.local` à la racine du projet et renseignez les variables nécessaires, par exemple :

```env
NEXT_PUBLIC_URL=http://localhost:3000
DATABASE_URL=... # selon votre base de données
```

4. **Démarrer le serveur de développement**

```bash
pnpm dev # ou npm run dev
```

## Scripts utiles

- `pnpm dev` : Démarre le serveur Next.js en mode développement
- `pnpm build` : Génère le build de production
- `pnpm start` : Démarre le serveur en production
- `pnpm lint` : Vérifie la qualité du code

## API

- **TRPC** : Les routes API sont disponibles dans `src/app/api/trpc/[trpc]/route.ts`
- **REST** : Les modèles et contrôleurs sont dans `src/lib/models/Url.ts` et `src/server/api/routers/url.ts`

## Personnalisation

- Les composants UI sont dans `src/app/_components/ui/`
- Les styles globaux sont dans `src/styles/globals.css`
- Le layout principal est dans `src/app/layout.tsx`

## Déploiement

Pour déployer sur Vercel :
1. Pousser le projet sur GitHub
2. Connecter le repo à Vercel
3. Configurer les variables d’environnement sur Vercel

## Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [TRPC](https://trpc.io/)

## Auteur

- [milocartal](https://github.com/milocartal)

---

N’hésite pas à ouvrir une issue ou une pull request pour toute amélioration !
