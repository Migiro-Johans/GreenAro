#!/bin/bash

# Green Aro SACCO Backend Setup Script
# This script helps set up the backend development environment

echo "🚀 Green Aro SACCO Backend Setup"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v) found${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm -v) found${NC}"

# Check if MySQL is installed
echo ""
echo "Checking MySQL installation..."
if ! command -v mysql &> /dev/null; then
    echo -e "${YELLOW}⚠️  MySQL command not found. Make sure MySQL is installed and running.${NC}"
else
    echo -e "${GREEN}✅ MySQL found${NC}"
fi

# Navigate to server directory
cd "$(dirname "$0")"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Create .env file if it doesn't exist
echo ""
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo -e "${GREEN}✅ .env file created${NC}"
    echo -e "${YELLOW}⚠️  Please update .env with your configuration before running the server${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Create required directories
echo ""
echo "📁 Creating required directories..."
mkdir -p uploads/leadership uploads/forms uploads/applications uploads/temp logs

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Directories created${NC}"
else
    echo -e "${RED}❌ Failed to create directories${NC}"
    exit 1
fi

# Database setup instructions
echo ""
echo "================================================"
echo "📊 Database Setup Instructions"
echo "================================================"
echo ""
echo "1. Login to MySQL:"
echo "   mysql -u root -p"
echo ""
echo "2. Create the database:"
echo "   CREATE DATABASE green_aro_sacco;"
echo ""
echo "3. Use the database:"
echo "   USE green_aro_sacco;"
echo ""
echo "4. Run the schema:"
echo "   source $(pwd)/../database/enhanced_schema.sql"
echo ""
echo "Or run directly from command line:"
echo "   mysql -u root -p green_aro_sacco < ../database/enhanced_schema.sql"
echo ""

# Final instructions
echo "================================================"
echo "✨ Setup Complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Update .env file with your configuration"
echo "2. Set up the database using the instructions above"
echo "3. Start the development server:"
echo "   npm run dev"
echo ""
echo "Or start in production mode:"
echo "   npm start"
echo ""
echo "📚 For full documentation, see README.md"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
