const { useState, useCallback, memo, Fragment } = React;

const SelectedItems = ({ selected }) => (
  <div style={{ padding: '16px', fontWeight: 'bold' }}>
    Selected: {selected.length ? selected.join(', ') : 'None'}
  </div>
);

const ListItem = memo(({ item, isSelected, toggleSelect }) => {
  const className = `List__item List__item--${item.color}` + (isSelected ? ' selected' : '');

  const handleClick = () => toggleSelect(item.name);

  return (
    <li className={className} onClick={handleClick}>
      {item.name}
    </li>
  );
});

const List = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState(new Set());

  const toggleSelect = useCallback((itemName) => {
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (next.has(itemName)) {
        next.delete(itemName);
      } else {
        next.add(itemName);
      }
      return next;
    });
  }, []);

  return (
    <Fragment>
      <SelectedItems selected={[...selectedItems]} />
      <ul className="List">
        {items.map(item => (
          <ListItem
            key={item.name}
            item={item}
            isSelected={selectedItems.has(item.name)}
            toggleSelect={toggleSelect}
          />
        ))}
      </ul>
    </Fragment>
  );
};

const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const colors = ['navy', 'blue', 'aqua', 'teal', 'olive', 'green', 'lime', 'yellow', 'orange', 'red', 'maroon', 'fuchsia', 'purple', 'silver', 'gray', 'black'];
const fruits = ['apple', 'banana', 'watermelon', 'orange', 'peach', 'tangerine', 'pear', 'kiwi', 'mango', 'pineapple'];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color,
            },
          ],
          [],
        ),
      ],
      [],
    ),
  ],
  [],
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<List items={items} />);
