import Arrays from '../../src/collection/Arrays';

describe('clone an array', function() {

    it('should return a new array with the same elements', function() {
        const input = [ "abc", "def" ];
        const output = Arrays.clone(input);
        expect(output).toEqual(input);
    });

    it('modifying the input array should not modify the output', function() {
        const input = [ "abc", "def" ];
        const output = Arrays.clone(input);
        input.pop(); input.pop();

        expect(output).not.toEqual(input);
    });

    it('clone should work on a number array as well', function() {
        const input = [ 1, 2, 3 ];
        const output = Arrays.clone(input);
        input.pop(); input.pop();
        expect(output).not.toEqual(input);
    });

    it('should clone array with elided elements', function() {
        const input = [ , , , , "def" ];
        const output = Arrays.clone(input);
        expect(output).toEqual(input);
    });

});

describe('clone a matrix', function() {

    it('should return a new matrix with the same elements', function() {
        const input = [ 
            ["abc", "def"], 
            ["ghi", "jkl"] 
        ];

        const output = Arrays.cloneMatrix(input);
        expect(output).toEqual(input);
    });

    it('modifying the input matrix should not modify the output', function() {
        const input = [ 
            ["abc", "def"], 
            ["ghi", "jkl"] 
        ];
        const output = Arrays.cloneMatrix(input);
        input[0][1] = "cba";

        expect(output).not.toEqual(input);
    });

    it('clone should work on a number matrix as well', function() {
        const input = [ 
            [1, 2], 
            [3, 4] 
        ];
        const output = Arrays.cloneMatrix(input);
        input[0][1] = 5;

        expect(output).not.toEqual(input);
    });

    it('clone should work with elided elements', function() {
        const input = [ 
            [ 1,  ,  ],
            [  , 2,  ],
            [  ,  , 3]
        ];
        const output = Arrays.cloneMatrix(input);
        expect(output).toEqual(input);
    });
});

