import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Tree from 'utils/treeStructure';

function makeTree(list) {
  let tree = new Tree();
  tree.add('Home', null, 'Home');
  for (let i = 0; i < list.length; i++) {
    if (list[i].parent === null) {
      tree.add(list[i]._id, 'Home', list[i].name);
    } else {
      tree.add(list[i]._id, list[i].parent, list[i].name);
    }
  }

  return tree.findBFS('Home');
}

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const FolderTreeView = ({ setParent, folders, itemId }) => {
  const classes = useStyles();

  let data;
  if (folders) {
    data = makeTree(folders);
  }

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onClick={() => setParent(nodes.id)}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => {
            // Dont show selected items branch
            if (node.id !== itemId) {
              return renderTree(node);
            }
            return <div></div>;
          })
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(data)}
    </TreeView>
  );
};

export default FolderTreeView;
