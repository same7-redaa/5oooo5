
import os

# Define the replacements map
replacements = {
    'صور شركات': 'companies',
    'لوجوهات': 'logos',
    'أراء العملاء': 'reviews',
    'اراء عملاء': 'reviews',
    'شركة 1': 'company-1',
    'شركة 2': 'company-2',
    'شركة 3': 'company-3',
    'شركة 4': 'company-4',
    'شركة 5': 'company-5',
    'شركة 6': 'company-6',
    'شركة 7': 'company-7',
    'مجمع شركات': 'company-complex'
}

# Sub-folder renames (need to do this manually in filesystem too if structured like this,
# but let's first update code references)

# Function to replace text in files
def update_files():
    file_extensions = ['.html', '.css', '.js', '.json']
    
    for root, dirs, files in os.walk('.'):
        # Skip .git folder
        if '.git' in dirs:
            dirs.remove('.git')
            
        for file in files:
            if any(file.endswith(ext) for ext in file_extensions):
                file_path = os.path.join(root, file)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content
                    for arabic, english in replacements.items():
                        # Replace regular path
                        new_content = new_content.replace(arabic, english)
                        # Replace URL encoded path (optional but good to have)
                        # Ignoring complex URL encoding for now, assuming direct text
                        
                    if new_content != content:
                        print(f"Updating: {file_path}")
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                            
                except Exception as e:
                    print(f"Skipping {file_path}: {e}")

if __name__ == '__main__':
    print("Starting path updates...")
    update_files()
    print("Code updates complete!")
