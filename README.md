# Package.json Sync Tool

A modern web application that helps developers synchronize dependency versions between different package.json files. Built with React, TypeScript, and Tailwind CSS.

![Package.json Sync Tool](https://sync-package-json.netlify.app/preview.png)

## 🚀 Features

- **Version Synchronization**: Update dependency versions from one package.json to another without adding new packages
- **Real-time Validation**: Instant JSON validation with clear error messages
- **Copy to Clipboard**: One-click copying of the synchronized package.json
- **Preserves Structure**: Maintains the original package.json structure while updating only versions
- **Modern UI**: Clean, responsive interface with smooth animations
- **Type-Safe**: Built with TypeScript for enhanced reliability

## 🛠️ How It Works

1. Paste your target package.json (the one you want to update) in the first textarea
2. Paste your source package.json (the one with the versions you want to copy) in the second textarea
3. Click "Sync Packages" to update the versions
4. Copy the resulting package.json with the updated versions

The tool only updates versions for packages that already exist in your target package.json. It won't add new packages or remove existing ones.

## 🔧 Technical Details

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for beautiful, minimal icons
- **Validation**: Built-in JSON parsing and validation
- **Build Tool**: Vite for fast development and optimized builds

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/package-json-sync.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Live Demo

Try it out at: [https://sync-package-json.netlify.app](https://sync-package-json.netlify.app)

## 📫 Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/package-json-sync](https://github.com/yourusername/package-json-sync)