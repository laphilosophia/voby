
/* IMPORT */

import type {Child, Resolvable} from '../types';
import useComputed from '../hooks/use_computed';
import useResolved from '../hooks/use_resolved';
import {isFunction} from '../utils/lang';

/* MAIN */

const Ternary = ({ when, children }: { when: Resolvable<boolean>, children: [Child, Child] }): Child => {

  if ( isFunction ( when ) ) {

    return useComputed ( () => {

      if ( useResolved ( when, true ) ) return children[0];

      return children[1];

    });

  } else {

    if ( when ) return children[0];

    return children[1];

  }

};

/* EXPORT */

export default Ternary;
