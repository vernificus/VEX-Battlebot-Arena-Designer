document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const palette = document.getElementById('palette');
    const clearBtn = document.getElementById('clear-btn');

    // Clear Field Functionality
    clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the field?')) {
            const placedItems = document.querySelectorAll('.placed-item');
            placedItems.forEach(item => item.remove());
        }
    });

    // Initialize Grid (6x8)
    for (let i = 0; i < 6 * 8; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.dataset.index = i;

        // Allow drop
        cell.addEventListener('dragover', (e) => {
            e.preventDefault();
            cell.classList.add('drag-over');
        });

        cell.addEventListener('dragleave', () => {
            cell.classList.remove('drag-over');
        });

        cell.addEventListener('drop', handleDrop);

        grid.appendChild(cell);
    }

    // Define Items
    const items = [
        { type: 'balloon', label: 'Cave / Structure', id: 'balloon-cave' },
        { type: 'balloon', label: '12in High', id: 'balloon-12in' },
        { type: 'balloon', label: 'Tight Corner', id: 'balloon-corner' },
        { type: 'balloon', label: 'Dead-end', id: 'balloon-deadend' },
        { type: 'balloon', label: 'Jail Cell', id: 'balloon-jail' },
        { type: 'balloon', label: 'Suspended 3in', id: 'balloon-3in' },
        { type: 'balloon', label: 'Moving Element', id: 'balloon-moving' },
        { type: 'balloon', label: 'Stacked (2)', id: 'balloon-stacked' },
        { type: 'balloon', label: 'Zig-zag', id: 'balloon-zigzag' },
        { type: 'balloon', label: '6in High', id: 'balloon-6in' },
        { type: 'wall', label: 'Wall', id: 'wall-piece' },
        { type: 'obstacle', label: 'Obstacle', id: 'obstacle-piece' }
    ];

    // Populate Palette
    items.forEach(item => {
        const el = document.createElement('div');
        el.classList.add('palette-item');
        el.draggable = true;
        el.textContent = item.label;
        el.dataset.type = item.type;
        el.dataset.label = item.label;

        if (item.type === 'wall') {
            el.classList.add('item-wall');
        } else if (item.type === 'balloon') {
            el.classList.add('item-balloon');
        } else if (item.type === 'obstacle') {
            el.classList.add('item-obstacle');
        }

        el.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({
                type: item.type,
                label: item.label
            }));
            e.dataTransfer.effectAllowed = 'copy';
        });

        palette.appendChild(el);
    });

    function handleDrop(e) {
        e.preventDefault();
        const cell = e.target.closest('.grid-cell');
        cell.classList.remove('drag-over');

        if (!cell) return;

        try {
            const data = JSON.parse(e.dataTransfer.getData('text/plain'));

            // Create the element to be placed
            const placedItem = document.createElement('div');
            placedItem.classList.add('placed-item');
            placedItem.textContent = data.label;

            if (data.type === 'wall') {
                placedItem.classList.add('item-wall');
            } else if (data.type === 'balloon') {
                placedItem.classList.add('item-balloon');
            } else if (data.type === 'obstacle') {
                placedItem.classList.add('item-obstacle');
            }

            // Allow removing by clicking
            placedItem.addEventListener('click', () => {
                placedItem.remove();
            });

            // Clear cell content before placing new item (optional, or allow multiple?)
            // For now, let's replace content
            cell.innerHTML = '';
            cell.appendChild(placedItem);

        } catch (err) {
            console.error('Error handling drop:', err);
        }
    }
});
