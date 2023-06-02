toolbox-selector-react
==============================================================================

Tenforce toolbox selector component

### Keyboard navigation
Once you are focused in on a toolbox-selector (either through clicking on one of the buttons or through a tabulation from another HTML element), you can use the arrows on your keyboard (left and right) to navigate between the different items.

Locked items (which only occur on required selectors when there is only one item selected) will automatically be skipped in this navigation.

Once focused on the item you want to toggle, simply press "space" and it will automatically be toggled on/off.

## Base components
### Selector
#### Description
Top component, it contains a list of values and can have several options.
Its children are of the type Item | ItemBlock | ItemBlockPart.
#### Parameters
- `extraClasses`: String, classes to be added to this component
- `isDeactivated`: Boolean, whether the selector should be deactivated
- `isDisabled`: Boolean, whether the selector should be disabled
- `isExpanded`: Boolean, whether all values are shown or not
- `isLoading`: Boolean, whether the selector should show a loading animation
- `isReadOnly`: Boolean, whether the selector should be read-only
- `isRequired`: Boolean, whether at least one value should be kept selected
- `isSingleSelect`: Boolean, whether more than one item can be selected
- `isWrapped`: Boolean, whether the selector items are flex wrapped or not

### Item
#### Description
This component represents a value that can be toggled on and off.
Its children are of the type Block.
#### Parameters
- `isPlaceholder`: Boolean, whether it should be dimmed or not
- `isSelected`: Boolean, whether this item is selected
- `onSelected`: Function, to be called when an item is selected. In most cases it will end up modifying the variable used for `isSelected`
- `onUnselected`: Function, to be called when an item is unselected. In most cases it will end up modifying the variable used for `isSelected`
- `extraClasses`: String, classes to be added to this component

### Block
#### Description
This component is a list of parts that represent a single entity.
Its children are of the type Part.
#### Parameters
- `isPlaceholder`: Boolean, whether it should be dimmed or not
- `extraClasses`: String, classes to be added to this component

### Part
#### Description
A subdivision of a Block.
#### Parameters
- `color`: String, a color code for this Part
- `isPlaceholder`: Boolean, whether it should be dimmed or not
- `isLabel`: Boolean, whether it should be label designed or not
- `extraClasses`: String, classes to be added to this component

## Specialist components
For ease of use, we've added a few predefined components.

### Checkbox
#### Description
Checkboxes are a selector with two items.
It can be used to render three possible states (checked, unchecked, undefined).
#### Parameters
Same props as Selector but also with:
- `isChecked`: Boolean, whether the truthy value is selected
- `isUnchecked`: Boolean, whether the falsy value is selected. This is set to be the opposite of `isChecked` if left undefined. Setting it allows the appearance of a three state checkbox.
- `onChecked`: Function, to be called when the truthy value is selected
- `onRemoveCheck`: Function, to be called when the truthy value is unselected
- `onUnchecked`: Function, to be called when the falsy value is selected
- `onRemoveUncheck`: Function, to be called when the falsy value is unselected
- `checkLabel`: String, the label for the truthy value
- `checkColor`: String, the color for the truthy value
- `uncheckLabel`: String, the label for the falsy value
- `uncheckColor`: String, the color for the falsy value

### ItemBlock
#### Description
An ItemBlock is a combination of an Item and a Block component. You can use it to shorten the code when an item as a single block.
#### Parameters
Same props as an Item but also with:
- `blockProps`: Object, the props for the Block component

### ItemBlockPart
#### Description
An ItemBlockPart is a combination of an Item, a Block and a Part component. You can use it to shorten the code when an item as a single block and a single part.
#### Parameters
Same props as an Item but also with:
- `blockProps`: Object, the props for the Block component
- `partProps`: Object, the props for the Part component

### BlockPart
#### Description
An BlockPart is a combination of a Block and a Part component. You can use it to shorten the code when a block as a single part.
#### Parameters
Same props as an Block but also with:
- `partProps`: Object, the props for the Part component

## Usage

Selector
```
<Selector
  singleSelect={singleSelect}
  required={required}
  expanded={expanded}
  extraClasses={extraClasses}>

  <Item isSelected={androidSelected}
        onSelected={() => this.setState({androidSelected: true})}
        onUnselected={() => this.setState({androidSelected: false})}>
      <Block>
          <Part color="#e50015"></Part>
          <Part>android</Part>
      </Block>
      <BlockPart>
          iOs
      </BlockPart>
  </Item>

  <ItemBlock
      isSelected={iosSelected}
      onSelected={() => this.setState({iosSelected: true})}
      onUnselected={() => this.setState({iosSelected: false})}>
      <Part color="#00baef"/>
      <Part isLabel={true}>ios</Part>
  </ItemBlock>

  <ItemBlockPart
      isSelected={webSelected}
      onSelected={()=>this.setState({webSelected: true})}
      onUnselected={()=>this.setState({webSelected: false})}
      partProps={{color: "#00ff00"}}>
      web
  </ItemBlockPart>
</Selector>
```

Checkbox
```
<Checkbox
  isChecked={checked}
  checkLabel={checkLabel}
  checkColor={checkColor}
  uncheckLabel={uncheckLabel}
  uncheckColor={uncheckColor}
  onChecked={()=>this.setState({checked:true})}
  onUnchecked={()=>this.setState({checked:false})}
  extraClasses={extraClasses}/>
```
